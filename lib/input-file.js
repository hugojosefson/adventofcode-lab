import {readFileSync} from 'fs'
import {join} from 'path'

export default dirname => readFileSync(join(dirname, 'input'), {encoding: 'utf8'})
