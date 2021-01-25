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

postAddPostR :: Handler Value
postAddPostR = do
    post <- requireInsecureJsonBody :: Handler Post
    postId <- runDB $ insert post
    return $ object ["id" .= postId]

putPostR :: PostId -> Handler Value
putPostR postId = do
    post <- requireInsecureJsonBody :: Handler Post
    runDB $ Yesod.replace postId $ post
    returnJson post

getPostsR :: Handler Value
getPostsR = do
    posts <- runDB $ selectList [] [Asc PostTitulo]
    -- test <- mapM (get404 . entityVal) posts
    return $ object ["results" .= True]

optionsPostR :: PostId -> Handler RepPlain
optionsPostR postId = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    return $ RepPlain $ toContent ("" :: Text)

optionsAddPostR :: Handler RepPlain
optionsAddPostR = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    return $ RepPlain $ toContent ("" :: Text)