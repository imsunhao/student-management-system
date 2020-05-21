import { DingDingRobot } from '@web-steps/release'
import { dingdingRobotSetting } from '../private-configuration'
import minimist from 'minimist'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

const { name, secret, hook } = dingdingRobotSetting

const robot = new DingDingRobot({ name, secret })

const args: Record<string, string> = minimist(process.argv.slice(2))

let { version } = args

if (!version) {
  console.error('version is undefined')
  process.exit(1)
}

if (version.startsWith('v')) {
  version = version.slice(1)
}

function getChangelog(path: string, version: string) {
  let CHANGELOG = fs.readFileSync(path, { encoding: 'utf-8' })

  // CHANGELOG 本版本的初始位置
  let pos = CHANGELOG.indexOf('## [' + version)
  if (pos === -1) {
    pos = CHANGELOG.indexOf('# [' + version)
  }
  if (pos === -1) {
    console.error(`[CHANGELOG] 找不到 本版本 [${version}] 的初始位置`)
    process.exit(1)
  } else {
    CHANGELOG = CHANGELOG.slice(pos)
  }

  // CHANGELOG 本版本的末位置
  pos = CHANGELOG.indexOf('## [', 3)
  if (pos !== -1) {
    CHANGELOG = CHANGELOG.slice(0, pos)
  }

  return CHANGELOG
}

const CHANGELOG = getChangelog(path.resolve(__dirname, '../CHANGELOG.md'), version)

const title = `student-management-system release: ${version}`

const { timestamp, sign } = robot.createSignature()

axios
  .post(`${hook}&timestamp=${timestamp}&sign=${sign}`, robot.markdown(title, CHANGELOG))
  .then(() => {
    console.log('钉钉消息已推送')
  })
  .catch(e => {
    console.log('钉钉消息已失败', e)
  })
