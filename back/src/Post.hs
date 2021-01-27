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
import qualified Database.Esqueleto      as E
import           Database.Esqueleto      ((^.))

data PostData = PostData (Entity Post, Entity Editor)

instance ToJSON PostData where
  toJSON (PostData (postEntity, editorEntity)) =
    let
      post = entityVal postEntity
      postId = entityKey postEntity
      editor = entityVal editorEntity
      editorId = entityKey editorEntity
    in
    object
      [ "id" .= postId
      , "titulo" .= postTitulo post
      , "conteudo" .= postConteudo post
      , "editor" .= object
        [ "id" .= editorId
        , "nome" .= editorNome editor
        ]
      ]

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
    addHeader "Access-Control-Allow-Credentials" "true"
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
    addHeader "Access-Control-Allow-Credentials" "true"
    addHeader "Access-Control-Allow-Origin" "*"
    posts <- runDB $ selectList [] [Asc PostTitulo]
    allPosts <- runDB
         $ E.select
         $ E.from $ \(post `E.InnerJoin` editor) -> do
              E.on $ post ^. PostEditorId E.==. editor ^. EditorId
              E.orderBy [E.desc (post ^. PostId)]
              return (post, editor)
    let allPosts' = PostData <$>  allPosts

    return $ object ["results" .= allPosts']

optionsPostR :: PostId -> Handler RepPlain
optionsPostR postId = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    addHeader "Access-Control-Allow-Credentials" "true"
    return $ RepPlain $ toContent ("" :: Text)

optionsAddPostR :: Handler RepPlain
optionsAddPostR = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    addHeader "Access-Control-Allow-Credentials" "true"
    return $ RepPlain $ toContent ("" :: Text)

optionsPostsR :: Handler RepPlain
optionsPostsR = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    addHeader "Access-Control-Allow-Credentials" "true"
    return $ RepPlain $ toContent ("" :: Text)