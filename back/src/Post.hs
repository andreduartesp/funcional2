{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Post where

import Foundation
import Yesod
import Yesod.Core
import Data.Text
import Control.Monad.IO.Class (liftIO)

instance ToJSON Post where
    toJSON (Post titulo conteudo editorId) = object ["titulo" .= titulo, "conteudo" .= conteudo, "editorId" .= editorId]

instance FromJSON Post where
    parseJSON (Object v) = do
        titulo <- v .: "titulo"
        conteudo <- v .: "conteudo"
        editorId <- v .: "editorId"
        return (Post titulo conteudo editorId)

getPostR :: PostId -> Handler Value
getPostR postId = do
    post <- runDB $ get404 postId
    returnJson post

postPostsR :: Handler Value
postPostsR = do
    post <- requireInsecureJsonBody :: Handler Post
    postId <- runDB $ insert post
    return $ object ["id" .= postId]

putPostR :: PostId -> Handler Value
putPostR postId = do
    post <- requireInsecureJsonBody :: Handler Post
    -- Yesod.replace postId $ post
    returnJson post

getPostsR :: Handler Value
getPostsR = do
    posts <- runDB $ selectList [] [Asc PostTitulo]
    liftIO $ print posts
    return $ object ["results" .= True]