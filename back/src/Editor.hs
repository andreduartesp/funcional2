{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Editor where

import Foundation
import Yesod

instance ToJSON Editor where
    toJSON (Editor nome) = object ["nome" .= nome]

instance FromJSON Editor where
    parseJSON (Object v) = do
        nome <- v .: "nome"
        return (Editor nome)

getEditorR :: EditorId -> Handler Value
getEditorR editorId = do
    editor <- runDB $ get404 editorId
    returnJson editor

postAddEditorR :: Handler Value
postAddEditorR = do
    editor <- requireInsecureJsonBody :: Handler Editor
    editorId <- runDB $ insert editor
    return $ object ["id" .= editorId]

putEditorR :: EditorId -> Handler Value
putEditorR editorId = do
    editor <- requireInsecureJsonBody :: Handler Editor
    runDB $ Yesod.replace editorId $ editor
    returnJson editor

getEditoresR :: Handler Value
getEditoresR = do
    runDB $ selectList [] [Asc EditorId]
    return $ object ["teste" .= True]
