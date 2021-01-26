{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}

import Application () -- for YesodDispatch instance
import Foundation
import Yesod.Core
import Yesod.Static
import Data.Text (Text, pack)
import Database.Persist.Postgresql
import Control.Monad.Logger (runStdoutLoggingT)
import Control.Monad.IO.Class (liftIO)
import System.Environment

connStr = read <$> getEnv "DATABASE_URL"

main::IO()
main = runStdoutLoggingT $ withPostgresqlPool connStr 10 $ \pool -> liftIO $ do
    flip runSqlPersistMPool pool $ do
        runMigration migrateAll
    port <- read <$> getEnv "PORT"
    warp port (App pool)