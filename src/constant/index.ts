export const MAX_DISPLAY_ENTRIES = 64;
export const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 主题名称与副标题名称
export const title = "JUMP TRADING MONITOR";
export const subtitle = [
  "host",     
  "strategy",    
  "instrument",    
];

// 各类标题与图标
type ModuleInfo = {
  name: string;
  icon: string;
}[];

export const moduleInfo: ModuleInfo = [
  // 中间的几个模块
  {
    name: "任务通过率",
    icon: "icon-chart-bar"
  },
  {
    name: "地图数据",
    icon: "icon-tongji4"
  },
  {
    name: "产品销售渠道分析",
    icon: "icon-align-left"
  },
  {
    name: "任务完成排行榜",
    icon: "icon-zhibiao2"
  },
  // 底部两个模块
  {
    name: "数据统计图",
    icon: "icon-vector"
  },
  {
    name: "工单修复以及满意度统计图",
    icon: "icon-fenxi7"
  }
];
