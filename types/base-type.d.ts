/* ------------ 全局基础定义类型 ------------ */

/* 远端字典类型 */
interface RemoteDictItem extends TreeItem {
  children?: RemoteDictItem[]
  [key: string]: any
}
// #endregion

// #region 用户信息相关定义

/* 用户 */
interface UserItem {
  /* 用户ID */
  id: string
  /* 用户名 */
  username: string
  /* 身份证号 */
  idCard: string
  /* 电话 */
  phone: string
  /* 头像 */
  photo?: string
  /* 单位ID */
  unitID: string
  /* 单位名称 */
  unitName: string
  /* 岗位ID */
  stationId: string
  /* 岗位名称 */
  stationName: string
  /* 警号 */
  alarmID: string
  /* 警综用户表ID */
  syncId: string
}

// #endregion
