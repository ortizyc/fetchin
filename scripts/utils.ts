import fs from 'fs'

export function removeDir(dir: string) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory) {
    return false
  }
  fs.rmSync(dir, { recursive: true, force: true })
  return true
}
