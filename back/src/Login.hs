{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Login where

import Foundation
import Yesod

postLoginR :: Handler Value
postLoginR = do
    return $ object ["teste" .= True]
