import './style.css'

import { Fetchin } from '@ortizyc/fetchin'

const fetchin = new Fetchin({
  baseURL: 'http://localhost:9999',
})

fetchin.get('/').then((res: any) => {
  console.log(res)
})
