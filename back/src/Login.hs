{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Login where

import Foundation
import Yesod

instance ToJSON Usuario where
    toJSON (Usuario nome usuario senha) = object ["nome" .= nome, "usuario" .= usuario, "senha" .= senha]

instance FromJSON Usuario where
    parseJSON (Object v) = do
        nome <- v .: "nome"
        usuario <- v .: "usuario"
        senha <- v .: "senha"
        return (Usuario nome usuario senha)

postLoginR :: Handler Value
postLoginR = do
    usuario <- requireInsecureJsonBody :: Handler Usuario
    setSession key val
    return $ object ["teste" .= True]

postCadastrarR :: Handler Value
postCadastrarR = do
    usuario <- requireInsecureJsonBody :: Handler Usuario
    usuarioId <- runDB $ insert usuario
    return $ object ["id" .= usuarioId]

getUsuarioR :: UsuarioId -> Handler Value
getUsuarioR usuarioId = do
    usuario <- runDB $ get404 usuarioId
    returnJson usuario

postAtualizarR :: UsuarioId -> Handler Value
postAtualizarR usuarioId = do
    usuario <- requireInsecureJsonBody :: Handler Usuario
    runDB $ Yesod.replace usuarioId $ usuario
    returnJson usuario
