/**
 * @interface 场景配置
 */
export interface ISCENE_CFG {
    /**
     * 名称
     */
    name: string;
    /**
     * 宽度
     */
    width: number;
    /**
     * 高度
     */
    height: number;
}

/**
 * @interface 相机配置
 */
export interface ICAMERA_CFG {
    /**
     * 是否可以移动相机
     */
    isCanMoveC?: boolean;
    /**
     * X方向是否可以移动相机
     */
    isCanMoveCX?: boolean;
    /**
     * Y方向是否可以移动相机
     */
    isCanMoveCY?: boolean;
    /**
     * 移动相机速度
     */
    moveSpeedC?: number;
    /**
     * 相机最小移动坐标X
     */
    minXRangeC?: number;
    /**
     * 相机最小移动坐标Y
     */
    minYRangeC?: number;
    /**
     * 相机最大移动坐标X
     */
    maxXRangeC?: number;
    /**
     * 相机最大移动坐标X
     */
    maxYRangeC?: number;
}