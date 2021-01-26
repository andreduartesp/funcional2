{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Login where

import Foundation
import Yesod
import Control.Monad.IO.Class (liftIO)

instance ToJSON Usuario where
    toJSON (Usuario nome usuario senha) = object ["nome" .= nome, "usuario" .= usuario, "senha" .= senha]

instance FromJSON Usuario where
    parseJSON (Object v) = do
        nome <- v .: "nome"
        usuario <- v .: "usuario"
        senha <- v .: "senha"
        return (Usuario nome usuario senha)

-- data Login [Char] [Char]

-- instance FromJSON Login where
--     parseJSON (Object v) = do
--         usuario <- v .: "usuario"
--         senha <- v .: "senha"
--         return (Login usuario senha)

fromJust :: Maybe (Entity a) -> a
fromJust Nothing = error "Maybe.fromJust: Nothing"
fromJust (Just (Entity x y)) = y

postLoginR :: Handler Value
postLoginR = do
    -- usuario <- requireInsecureJsonBody :: Handler Login
    setSession "usuario" "1"
    databaseUsuario <- runDB $ selectFirst [UsuarioUsuario ==. "eu@andreduartesp.net"] []
    liftIO $ print $ toJSON $ fromJust databaseUsuario
    return $ object ["logged" .= True]

postCadastrarR :: Handler Value
postCadastrarR = do
    usuario <- requireInsecureJsonBody :: Handler Usuario
    usuarioId <- runDB $ insert usuario
    return $ object ["id" .= usuarioId]

getUsuarioR :: UsuarioId -> Handler Value
getUsuarioR usuarioId = do
    addHeader "Access-Control-Allow-Credentials" "true"
    usuario <- runDB $ get404 usuarioId
    returnJson usuario

postAtualizarR :: UsuarioId -> Handler Value
postAtualizarR usuarioId = do
    usuario <- requireInsecureJsonBody :: Handler Usuario
    runDB $ Yesod.replace usuarioId $ usuario
    returnJson usuario
