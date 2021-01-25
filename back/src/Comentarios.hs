{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

module Comentarios where

import Foundation
import Yesod

getComentariosR :: PostId -> Handler Value
getComentariosR postId = do
    runDB $ selectList [ComentarioPostId ==. postId] []
    return $ object ["teste" .= True]
