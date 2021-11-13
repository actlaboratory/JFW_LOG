# JAWS_logger

JAWS for Windows Logging Tool

## 何者か

* JAWS for Windowsの動作ログを出力できるツール
* 将来的にはテキストファイルに書き出すようにする予定

## 動作環境

* JAWS 2021 JPNにて動作を確認
* 他のバージョンでも動く予定？

## セットアップ

1. explorerで、本リポジトリ内の「scripts」フォルダを開く。
2. Ctrl+A, Ctrl+Cを押して、全ファイルをコピーする。
3. JAWSのメインウィンドウ（またはコンテキストメニュー）から、[ユーティリティ(U)]→[ユーティリティフォルダを開く(X)]を実行する。
4. [個人設定を開く]を実行する。
5. Ctrl+Vを押して、ファイルを貼り付ける。
6. JAWSのメインウィンドウ（またはコンテキストメニュー）から、[ユーティリティ(U)]→[スクリプトマネージャ(S)]を実行する。
7. スクリプトマネージャが開き、デフォルト・スクリプトが標示される。
8. Ctrl+Endを押した後、下記のコードを入力する。

```
;; for logger

use "logger.jsb"

globals
	int g_iLoggerEnabled

Script toggleLogger ()
if g_iLoggerEnabled then
	disableLogger()
else
	enableLogger()
EndIf
EndScript
```

9. Ctrl+Sを押して、スクリプトを保存する。

## 使い方

Shift+Ctrl+JAWSKey+Dを押すと、ログ出力の有効・無効が切り替わる。
現時点では、ログ出力が有効のとき、発生したイベントや実行されたスクリプトの名前が読み上げられる。
