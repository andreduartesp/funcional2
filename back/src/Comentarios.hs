{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Comentarios where

import Foundation
import Yesod

instance ToJSON Comentario where
    toJSON (Comentario conteudo postId usuarioId) = object ["conteudo" .= conteudo, "postId" .= postId, "usuarioId" .= usuarioId]

instance FromJSON Comentario where
    parseJSON (Object v) = do
        conteudo <- v .: "conteudo"
        postId <- v .: "postId"
        usuarioId <- v .: "usuarioId"
        return (Comentario conteudo postId usuarioId)

getComentariosR :: PostId -> Handler Value
getComentariosR postId = do
    addHeader "Access-Control-Allow-Credentials" "true"
    runDB $ selectList [ComentarioPostId ==. postId] []
    return $ object ["teste" .= True]

postComentarioR ::  Handler Value
postComentarioR = do
    comentario <- requireInsecureJsonBody :: Handler Comentario
    comentarioId <- runDB $ insert comentario
    return $ object ["comentario" .= comentarioId]
