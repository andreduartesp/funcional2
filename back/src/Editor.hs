{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Editor where

import Foundation
import Yesod
import Data.Text

instance ToJSON Editor where
    toJSON (Editor nome email senha) = object ["nome" .= nome, "email" .= email, "senha" .= senha]

instance FromJSON Editor where
    parseJSON (Object v) = do
        nome <- v .: "nome"
        email <- v .: "email"
        senha <- v .: "senha"
        return (Editor nome email senha)

postEditorLoginR :: Text -> Text -> Handler Value
postEditorLoginR usuarioReq senhaReq = do
    addHeader "Access-Control-Allow-Credentials" "true"
    databaseUsuario <- runDB $ selectList [EditorEmail ==. usuarioReq, EditorSenha ==. senhaReq] []
    let usuario' = Prelude.map (\x -> entityKey x) databaseUsuario
    return $ object ["results" .= usuario']

getEditorR :: EditorId -> Handler Value
getEditorR editorId = do
    addHeader "Access-Control-Allow-Credentials" "true"
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
    addHeader "Access-Control-Allow-Credentials" "true"
    runDB $ selectList [] [Asc EditorId]
    return $ object ["teste" .= True]


optionsEditorR :: EditorId -> Handler RepPlain
optionsEditorR editorId = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    addHeader "Access-Control-Allow-Credentials" "true"
    return $ RepPlain $ toContent ("" :: Text)

optionsAddEditorR :: Handler RepPlain
optionsAddEditorR = do
    addHeader "Access-Control-Allow-Origin" "*"
    addHeader "Access-Control-Allow-Methods" "PUT, OPTIONS, POST, GET"
    addHeader "Access-Control-Allow-Credentials" "true"
    return $ RepPlain $ toContent ("" :: Text)