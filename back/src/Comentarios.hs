{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Comentarios where

import Foundation
import Yesod
import qualified Database.Esqueleto as E
import Database.Esqueleto ((^.))

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
        postId <- v .: "postId"
        usuarioId <- v .: "usuarioId"
        return (Comentario conteudo usuarioId postId)

getComentariosR :: PostId -> Handler Value
getComentariosR postId = do
    addHeader "Access-Control-Allow-Credentials" "true"
    addHeader "Access-Control-Allow-Origin" "*"
    allComentarios <- runDB
         $ E.select
         $ E.from $ \(comentario `E.InnerJoin` usuario) -> do
              E.on $ comentario ^. ComentarioUsuarioId E.==. usuario ^. UsuarioId
              E.where_ $ comentario ^. ComentarioPostId E.==. E.val postId
              E.orderBy [E.desc (comentario ^. ComentarioId)]
              return (comentario, usuario)
    let allComentarios' = ComentarioData <$>  allComentarios
    return $ object ["results" .= allComentarios']

postComentarioR ::  Handler Value
postComentarioR = do
    addHeader "Access-Control-Allow-Credentials" "true"
    addHeader "Access-Control-Allow-Origin" "*"
    comentario <- requireInsecureJsonBody :: Handler Comentario
    comentarioId <- runDB $ insert comentario
    return $ object ["comentario" .= comentarioId]

optionsComentariosR :: Handler RepPlain
optionsPostsR = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    addHeader "Access-Control-Allow-Credentials" "true"
    return $ RepPlain $ toContent ("" :: Text)
