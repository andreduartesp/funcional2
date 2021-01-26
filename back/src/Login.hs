{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Login where

import Foundation
import Yesod
import Data.Text
import Control.Monad.IO.Class (liftIO)
import qualified Database.Esqueleto as E
import Database.Esqueleto ((^.))

data UsuarioData = UsuarioData(Entity Usuario)

-- instance ToJSON UsuarioData where
--     toJSON usuarioData(usuarioEntity) =
--         let
--             usuario = entityVal usuarioEntity
--             usuarioId = entityKey usuarioEntity
--         in
--             object[ "nome" .= usuarioNome usuario, "usuario" .= usuarioUsuario usuario]

instance ToJSON Usuario where
    toJSON (Usuario nome usuario senha) = object ["nome" .= nome, "usuario" .= usuario, "senha" .= senha]

instance FromJSON Usuario where
    parseJSON (Object v) = do
        nome <- v .: "nome"
        usuario <- v .: "usuario"
        senha <- v .: "senha"
        return (Usuario nome usuario senha)

fromJust :: Maybe (Entity a) -> a
fromJust Nothing = error "Maybe.fromJust: Nothing"
fromJust (Just (Entity x y)) = y

postLoginR :: Text -> Text -> Handler Value
postLoginR usuarioReq senhaReq = do
    addHeader "Access-Control-Allow-Credentials" "true"
    let usuarioa = ("eu@andreduartesp.net" :: Text)
    databaseUsuario <- runDB $ selectList [UsuarioUsuario ==. usuarioReq, UsuarioSenha ==. senhaReq] []
    let usuario' = Prelude.map (\x -> entityKey x) databaseUsuario
    return $ object ["results" .= usuario']

postCadastrarR :: Handler Value
postCadastrarR = do
    addHeader "Access-Control-Allow-Credentials" "true"
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
    addHeader "Access-Control-Allow-Credentials" "true"
    usuario <- requireInsecureJsonBody :: Handler Usuario
    runDB $ Yesod.replace usuarioId $ usuario
    returnJson usuario
