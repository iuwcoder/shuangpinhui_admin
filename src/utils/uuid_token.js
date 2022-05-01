import { v4 as uuidv4} from 'uuid'

// 单例模式
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先获取，检查是否有
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 没有，就获取
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}