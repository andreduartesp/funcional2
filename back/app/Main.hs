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

connStr = "postgres://rwheorhgzwgmsv:2b79672ba18e6b8e9356a6071e14a96fb8fbabc48a8e7fe04ce1d8e11de1bef9@ec2-34-237-89-96.compute-1.amazonaws.com:5432/d88nt9pi0s21kq"

main::IO()
main = runStdoutLoggingT $ withPostgresqlPool connStr 10 $ \pool -> liftIO $ do
    flip runSqlPersistMPool pool $ do
        runMigration migrateAll
    port <- getEnv "PORT"
    warp 80 (App pool)