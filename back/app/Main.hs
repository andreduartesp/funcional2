{-# LANGUAGE OverloadedStrings #-}

import Application () -- for YesodDispatch instance
import Foundation
import Yesod.Core
import Yesod.Static

import Database.Persist.Postgresql
import Control.Monad.Logger (runStdoutLoggingT)
import Control.Monad.IO.Class (liftIO)

connStr = "dbname=funcional host=localhost user=myuser password=mypass port=5432"

main::IO()
main = runStdoutLoggingT $ withPostgresqlPool connStr 10 $ \pool -> liftIO $ do
       flip runSqlPersistMPool pool $ do
              runMigration migrateAll
       warp 8080 (App pool)