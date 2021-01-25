{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Post where

import Data.Text
import Yesod.Persist
import Foundation
import Yesod.Core
import Yesod
import Data.Aeson
import Yesod.Core.Json

newtype PostData = PostData (Post)

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
    post <- requireJsonBody :: Handler Post
    -- postId2 <- insert post
    return $ object ["id" .= postId]

putPostR :: PostId -> Handler Value
putPostR postId = do
    post <- requireJsonBody :: Handler Post
    -- Yesod.replace postId $ post
    returnJson post
