# -*- coding: utf-8 -*-
#app build tool
#Copyright (C) 2019 Yukio Nozawa <personal@nyanchangames.com>
#Copyright (C) 2019-2020 guredora <contact@guredora.com>
#Copyright (C) 2021 yamahubuki <itiro.ishino@gmail.com>
#Copyright (C) 2021 Hiroki Fujii <hfujii@hisystron.com>

#constantsのimport前に必要
import os
import sys
sys.path.append(os.getcwd())

import datetime
import glob
import hashlib
import json
import math
import shutil
import subprocess
import urllib.request
import zipfile

import constants
from tools import bumpup


class build:
	def __init__(self):
		# appVeyorかどうかを判別し、処理をスタート
		appveyor = self.setAppVeyor()
		print("Starting build for %s(appveyor mode=%s)" % (constants.APP_NAME, appveyor))

		# パッケージのパスとファイル名を決定
		package_path = os.path.join("dist", constants.APP_NAME)
		if 'APPVEYOR_REPO_TAG_NAME' in os.environ:
			build_filename = os.environ['APPVEYOR_REPO_TAG_NAME']
		else:
			build_filename = 'snapshot'
		print("Will be built as %s" % build_filename)

		# 前のビルドをクリーンアップ
		self.creen(package_path)

		# appveyorでのスナップショットの場合はバージョン番号を一時的に書き換え
		if build_filename == "snapshot" and appveyor:
			self.makeSnapshotVersionNumber()

		# ビルド
		self.build(package_path, build_filename)
		archive_name = "%s-%s.zip" % (constants.APP_NAME, build_filename)

		# スナップショットでなければ
		if build_filename == "snapshot" and not appveyor:
			print("Skipping batch archiving because this is a local snapshot.")
		else:
			patch_name = self.makePatch(build_filename, archive_name)
			if constants.UPDATER_URL is not None:
				self.addUpdater(archive_name)
			self.makePackageInfo(archive_name, patch_name, build_filename)
		print("Build finished!")

	def setAppVeyor(self):
		if len(sys.argv)>=2 and sys.argv[1]=="--appveyor":
			return True
		return False

	def creen(self,package_path):
		if os.path.isdir(package_path):
			print("Clearling previous build...")
			shutil.rmtree("dist\\")

	def makeSnapshotVersionNumber(self):
		#日本標準時オブジェクト
		JST = datetime.timezone(datetime.timedelta(hours=+9))
		#Pythonは世界標準時のZに対応していないので文字列処理で乗り切り、それを日本標準時に変換
		dt = datetime.datetime.fromisoformat(os.environ["APPVEYOR_REPO_COMMIT_TIMESTAMP"][0:19]+"+00:00").astimezone(JST)
		major = str(dt.year)[2:4]+str(dt.month).zfill(2)
		minor = str(dt.day)
		patch = str(int(math.floor((dt.hour*3600+dt.minute*60+dt.second)/86400*1000)))
		constants.APP_VERSION = major+"."+minor+"."+patch
		constants.APP_LAST_RELEASE_DATE = str(dt.date())
		bumpup.bumpup(major+"."+minor+"."+patch, str(dt.date()))

	def build(self,package_path, build_filename):
		print("Building...")
		os.makedirs(package_path)
		for elem in glob.glob("public\\*"):
			if os.path.isfile(elem):
				shutil.copyfile(elem, os.path.join(package_path, os.path.basename(elem)))
			else:
				shutil.copytree(elem, os.path.join(package_path, os.path.basename(elem)))
		print("Compressing into package...")
		shutil.make_archive("%s-%s" % (constants.APP_NAME, build_filename),'zip','dist')

	def makePatch(self, build_filename, archive_name):
		patch_name = None
		if constants.BASE_PACKAGE_URL is not None:
			print("Making patch...")
			patch_name = "%s-%spatch" % (constants.APP_NAME, build_filename)
			archiver=diff_archiver.DiffArchiver(constants.BASE_PACKAGE_URL, archive_name, patch_name,clean_base_package=True, skip_root = True)
			archiver.work()
		return patch_name

	def addUpdater(self, archive_name):
		print("downloading updater...")
		urllib.request.urlretrieve(constants.UPDATER_URL, "updater.zip")
		print("writing updater...")
		with zipfile.ZipFile("updater.zip", "r") as zip:
			zip.extractall()
		with zipfile.ZipFile(archive_name, mode = "a") as zip:
			zip.write("ionic.zip.dll", "%s/ionic.zip.dll" % (constants.APP_NAME))
			zip.write("updater.exe", "%s/updater.exe" % (constants.APP_NAME))
		os.remove("ionic.zip.dll")
		os.remove("updater.exe")
		os.remove("updater.zip")

	def makePackageInfo(self, archive_name, patch_name, build_filename):
		print("computing hash...")
		with open(archive_name, mode = "rb") as f:
			package_hash = hashlib.sha1(f.read()).hexdigest()
		if constants.BASE_PACKAGE_URL is not None:
			with open(patch_name+".zip", mode = "rb") as f:
				patch_hash = hashlib.sha1(f.read()).hexdigest()
		else:
			patch_hash = None
		print("creating package info...")
		info = {}
		info["package_hash"] = package_hash
		info["patch_hash"] = patch_hash
		info["version"] = constants.APP_VERSION
		info["released_date"] = constants.APP_LAST_RELEASE_DATE
		with open("%s-%s_info.json" % (constants.APP_NAME, build_filename), mode = "w") as f:
			json.dump(info, f)


if __name__ == "__main__":
	build()
