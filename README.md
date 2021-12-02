# JAWS_logger

JAWS for Windows Logging Tool

## 何者か

* JAWS for Windowsの動作ログを出力できるツール
* 将来的にはテキストファイルに書き出すようにする予定

## 動作環境

* JAWS 2021 JPNにて動作を確認
* 他のバージョンでも動く予定？

## セットアップ

1. 本リポジトリの「scripts」フォルダの中身を、JAWSの個人設定フォルダにコピーする。
   1. explorerで、本リポジトリ内の「scripts」フォルダを開く。
   2. Ctrl+A, Ctrl+Cを押して、全ファイルをコピーする。
   3. JAWSのメインウィンドウ（またはコンテキストメニュー）から、[ユーティリティ(U)]→[ユーティリティフォルダを開く(X)]を実行する。
   4. [個人設定を開く]を実行する。
   5. Ctrl+Vを押して、ファイルを貼り付ける。
2. 本リポジトリの「add_to_default.txt」の内容を、JAWSのデフォルト・スクリプトに追記する。
   1. 「add_to_default.txt」を開き、内容をすべてクリップボードにコピー（Ctrl+A, Ctrl+C）する。
   2. JAWSのメインウィンドウ（またはコンテキストメニュー）から、[ユーティリティ(U)]→[スクリプトマネージャ(S)]を実行する。
   3. スクリプトマネージャが開き、デフォルト・スクリプトが標示される。
   4. Ctrl+Endを押した後、Ctrl+Vで貼り付ける。
   5. Ctrl+Sを押して、スクリプトを保存する。

## 使い方

Shift+Ctrl+JAWSKey+Dを押すと、ログ出力の有効・無効が切り替わる。
現時点では、ログ出力が有効のとき、発生したイベントや実行されたスクリプトの名前が読み上げられる。
