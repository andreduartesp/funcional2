{-# LANGUAGE DataKinds #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell   #-}
{-# LANGUAGE RecordWildCards   #-}
{-# LANGUAGE TypeFamilies      #-}
{-# LANGUAGE ViewPatterns      #-}
{-# LANGUAGE DeriveAnyClass #-}

{-# LANGUAGE OverloadedStrings, TypeFamilies, QuasiQuotes,
             TemplateHaskell, GADTs, FlexibleInstances,
             MultiParamTypeClasses, DeriveDataTypeable,
             GeneralizedNewtypeDeriving, ViewPatterns, EmptyDataDecls#-}


{-# LANGUAGE DerivingStrategies #-}
{-# LANGUAGE StandaloneDeriving #-}
{-# LANGUAGE UndecidableInstances #-}

module Foundation where

import Yesod.Core
import Yesod
import Data.Text
import Database.Persist.Postgresql

share [mkPersist sqlSettings, mkMigrate "migrateAll"] [persistLowerCase|
Editor
    nome Text
    deriving Show
Usuario
    nome Text
    deriving Show
Post
    titulo Text
    conteudo Text
    editorId EditorId
    deriving Show
Comentario
    conteudo Text
    usuarioId UsuarioId
    postId PostId
    deriving Show
Curtidos
    postId PostId
    usuarioId UsuarioId
    UniqueCurtidos postId usuarioId
|]

data App = App{connPool :: ConnectionPool}

mkYesodData "App" $(parseRoutesFile "routes.yesodroutes")

instance Yesod App

instance RenderMessage App FormMessage where
    renderMessage _ _ = defaultFormMessage

instance YesodPersist App where
   type YesodPersistBackend App = SqlBackend
   runDB f = do
       master <- getYesod
       let pool = connPool master
       runSqlPool f pool
