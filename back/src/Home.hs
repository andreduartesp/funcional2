{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes       #-}
module Home where

import Foundation
import Yesod.Core

getHomeR :: Handler Html
getHomeR = defaultLayout $ do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Credentials" "true"
    setTitle "Minimal Multifile"
    [whamlet|
        <h1>
            Ola mundo!
    |]