{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Post where

import Foundation
import Yesod

instance ToJSON Post where
    toJSON (Post titulo conteudo autorId) = object ["titulo" .= titulo, "conteudo" .= conteudo, "autorId" .= autorId]

instance FromJSON Post where
    parseJSON (Object v) = do
        titulo <- v .: "titulo"
        conteudo <- v .: "conteudo"
        autorId <- v .: "autorId"
        return (Post titulo conteudo autorId)

getPostR :: PostId -> Handler Value
getPostR postId = do
    post <- runDB $ get404 postId
    returnJson post

postPostR :: PostId -> Handler Value
postPostR postId = do
    post <- requireInsecureJsonBody :: Handler Post
    -- postId <- insert post
    return $ object ["id" .= postId]

putPostR :: PostId -> Handler Value
putPostR postId = do
    post <- requireInsecureJsonBody :: Handler Post
    -- Yesod.replace postId $ post
    returnJson post

getPostsR :: Handler Value
getPostsR = do
    -- selectList [ComentarioPostId ==. postId] []
    return $ object ["teste" .= True]
