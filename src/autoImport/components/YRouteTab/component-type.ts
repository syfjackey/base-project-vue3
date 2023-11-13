export interface YRouteTabItem {
  title: string
  routeName: string
  icon?: string
  params?: {
    [key: string]: any
  }
  query?: {
    [key: string]: any
  }
  tabKey: string
}
export type DelType = 'other' | 'right' | 'all' | 'self'
