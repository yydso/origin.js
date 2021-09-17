import path from 'path'
import { Options } from 'execa'
import run, { DEMO_PATH } from './execCommands'

export default function buildTestProject(name: string) {
  const rootDir: string = path.resolve(__dirname, DEMO_PATH)
  const projectRoot: string = path.resolve(rootDir, name)

  const args: readonly string[] = ['build']
  const options: Options<string> = { cwd: projectRoot }

  return run(args, options)
}