{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Post where

import Data.Text (Text)
import Yesod
import Yesod.Persist
import Foundation
import Yesod.Core
import Yesod
import Data.Aeson
import Yesod.Core.Json

data PostData = PostData (Post)

instance ToJSON Post where
    toJSON (Post titulo conteudo autorId) = object ["titulo" .= titulo, "conteudo" .= conteudo, "autorId" .= autorId]

getPostR :: PostId -> Handler Value
getPostR postId = do
    post <- runDB $ get404 postId
    let post' = toJSON post
    return $ post'
