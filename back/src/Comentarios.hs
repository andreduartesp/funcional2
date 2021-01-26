{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Comentarios where

import Foundation
import Yesod
import qualified Database.Esqueleto      as E
import           Database.Esqueleto      ((^.))

data ComentarioData = ComentarioData(Entity Comentario, Entity Usuario)

instance ToJSON ComentarioData where
    toJSON (ComentarioData (comentarioEntity, usuarioEntity)) =
        let
            comentario = entityVal comentarioEntity
            comentarioId = entityKey comentarioEntity
            usuario = entityVal usuarioEntity
            usuarioId = entityKey usuarioEntity
        in
        object
        [ "id" .= comentarioId
        , "conteudo" .= comentarioConteudo comentario
        , "usuario" .= object
            [ 
              "nome" .= usuarioNome usuario
            , "usuario" .= usuarioUsuario usuario
            ]
        ]
instance ToJSON Comentario where
    toJSON (Comentario conteudo comentarioId usuarioId) = object ["conteudo" .= conteudo, "comentarioId" .= comentarioId, "usuarioId" .= usuarioId]

instance FromJSON Comentario where
    parseJSON (Object v) = do
        conteudo <- v .: "conteudo"
        comentarioId <- v .: "comentarioId"
        usuarioId <- v .: "usuarioId"
        return (Comentario conteudo comentarioId usuarioId)

getComentariosR :: PostId -> Handler Value
getComentariosR postId = do
    allComentarios <- runDB
         $ E.select
         $ E.from $ \(comentario `E.InnerJoin` usuario) -> do
              E.on $ comentario ^. ComentarioUsuarioId E.==. usuario ^. UsuarioId
              E.orderBy [E.desc (comentario ^. ComentarioId)]
              return (comentario, usuario)
    let allComentarios' = ComentarioData <$>  allComentarios
    return $ object ["results" .= allComentarios']

postComentarioR ::  Handler Value
postComentarioR = do
    comentario <- requireInsecureJsonBody :: Handler Comentario
    comentarioId <- runDB $ insert comentario
    return $ object ["comentario" .= comentarioId]
