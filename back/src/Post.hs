{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes       #-}
{-# LANGUAGE RecordWildCards   #-}
{-# LANGUAGE TemplateHaskell   #-}
{-# LANGUAGE TypeFamilies      #-}

module Post where

import Data.Text (Text)
import Yesod
import Yesod.Persist
import Foundation
import Yesod.Core
import Yesod
import Data.Aeson
import Yesod.Core.Json

-- data Pessoa = Pessoa 

-- getPostR :: Handler TypedContent
-- getPostR = selectRep $ do
--     provideRep $ do

--     provideJson pessoa
--     where
--         pessoa = Pessoa "titulo" "conteudo"

-- getPostR :: PostId -> Handler TypedContent
-- getPostR postId = selectRep $ do
--     provideJson post
--     where
--         post = runDB $ postId

data PostData = PostData (Post)

instance ToJSON PostData where
  toJSON (PostData (postEntity)) =
    let
      post = entityVal postEntity
    in
    object
      [ "titulo" .= postTitulo post
      , "conteudo" .= postConteudo post
      ]

getPostR :: PostId -> Handler Value
getPostR postId = do
    post <- runDB $ get404 postId
    let post' = toJSON $ PostData post
    return $ object [ "posts" .= post' ]
    -- defaultLayout $ do
    --     setTitle "Cadastro Pessoas"

    --     [whamlet|
    --         #{to post}
    --     |]

