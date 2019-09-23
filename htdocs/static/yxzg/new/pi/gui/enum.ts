
/**
 * 
 */
export enum YGAlign {
  YGAlignAuto = 0,
  YGAlignFlexStart = 1,
  YGAlignCenter = 2,
  YGAlignFlexEnd = 3,
  YGAlignStretch = 4,
  YGAlignBaseline = 5,
  YGAlignSpaceBetween = 6,
  YGAlignSpaceAround = 7
}

export enum YGDimension {
  YGDimensionWidth = 0,
  YGDimensionHeight = 1
}

export enum YGDirection {
  YGDirectionInherit = 0,
  YGDirectionLTR = 1,
  YGDirectionRTL = 2
}

export enum YGDisplay {
  YGDisplayFlex = 0,
  YGDisplayNone = 1
}

export enum YGEdge {
  YGEdgeLeft = 0,
  YGEdgeTop = 1,
  YGEdgeRight = 2,
  YGEdgeBottom = 3,
  YGEdgeStart = 4,
  YGEdgeEnd = 5,
  YGEdgeHorizontal = 6,
  YGEdgeVertical = 7,
  YGEdgeAll = 8
}

export enum YGExperimentalFeature {
  YGExperimentalFeatureWebFlexBasis = 0
}

export enum YGFlexDirection {
  YGFlexDirectionColumn = 0,
  YGFlexDirectionColumnReverse = 1,
  YGFlexDirectionRow = 2,
  YGFlexDirectionRowReverse = 3
}

export enum YGJustify {
  YGJustifyFlexStart = 0,
  YGJustifyCenter = 1,
  YGJustifyFlexEnd = 2,
  YGJustifySpaceBetween = 3,
  YGJustifySpaceAround = 4,
  YGJustifySpaceEvenly = 5
}

export enum YGLogLevel {
  YGLogLevelError = 0,
  YGLogLevelWarn = 1,
  YGLogLevelInfo = 2,
  YGLogLevelDebug = 3,
  YGLogLevelVerbose = 4,
  YGLogLevelFatal = 5
}

export enum YGMeasureMode {
  YGMeasureModeUndefined = 0,
  YGMeasureModeExactly = 1,
  YGMeasureModeAtMost = 2
}

export enum YGNodeType {
  YGNodeTypeDefault = 0,
  YGNodeTypeText = 1
}

export enum YGOverflow {
  YGOverflowVisible = 0,
  YGOverflowHidden = 1,
  YGOverflowScroll = 2
}

export enum YGPositionType {
  YGPositionTypeRelative = 0,
  YGPositionTypeAbsolute = 1
}

export enum YGPrintOptions {
  YGPrintOptionsLayout = 1,
  YGPrintOptionsStyle = 2,
  YGPrintOptionsChildren = 4
}

export enum YGUnit {
  YGUnitUndefined = 0,
  YGUnitPoint = 1,
  YGUnitPercent = 2,
  YGUnitAuto = 3
}

export enum YGWrap {
  YGWrapNoWrap = 0,
  YGWrapWrap = 1,
  YGWrapWrapReverse = 2
}

export enum EnabledTypes {
  auto = 0,
  none = 1,
  visible = 2
}

export enum LengthUnitType {
  Pixel = 0,
  Percent = 1,
  Auto = 2
}

export enum Opacity {
  Opaque = 0,
  Translucent = 1,
  Transparent = 2
}

export enum RadialGradientShapes {
  circle = 0,
  ellipse = 1
}

export enum RadialGradientSize {
    ClosestSide = 0,
    FarthestSide = 1,
    ClosestCorner = 2,
    Farthestcorner = 3
}

export enum   FitTypes {
    None    = 0,
    Fill    = 1,
    Contain = 2,
    Cover   = 3,
    ScaleDown = 4
}      
export enum UndefinedType {
  // decorate
  BorderColor,
  BorderRadius,

  BoxShadowColor,
  BoxShadowH,
  BoxShadowV,
  // BoxShadowBlur, 暂不支持

  BackgroundColor,

  //
  Opacity,
  Overflow,
  Visibility,

  // 变换
  TransformRotate,
  TransformScale,
  TransformScaleX,
  TransformScaleY,
  TransformTranslate,
  TransformTranslateX,
  TransformTranslateY,

  // 布局
  AlignContent,
  JustifyContent,
  FlexDirection,
  FlexWrap,
  FlexGrow,
  FlexShrink,
  FlexBasis,
  AlignSelf,

  Left,
  Top,
  Right,
  Bottom,

  Width,
  Height,

  MaxWidth,
  MaxHeight,
  MinWidth,
  MinHeight,

  PaddingLeft,
  PaddingTop,
  PaddingRight,
  PaddingBottom,

  MarginLeft,
  MarginTop,
  MarginRight,
  MarginBottom
}

/**
 */
export enum VerticalAlign {
  Center,
  Top,
  Bootom,
  Undefined
}
/**
 */
export enum TextDirection {
  Left,
  Right,
  Top,
  Bootom,
  Undefined
}
/**
 */
export enum TextAlign {
  Left,
  Right,
  Center,
  Justify,
  Undefined
}
/**
 */
export enum WhiteSpace {
  Normal,
  Nowrap,
  PreWrap,
  Pre,
  PreLine,
  Undefined
}
/**
 */
export enum FontStyle {
  Normal,
  Ttalic,
  Oblique,
  Undefined
}
/**
 */
export enum FontWeight {
  Normal = 600,
  Bold = 700,
  Bolder = 900,
  Lighter = 300,
  One = 100,
  Two = 200,
  Three = 300,
  Four = 400,
  Five = 500,
  Six = 600,
  Seven = 700,
  Eight = 800,
  Nine = 900,
  Undefined = 500
}
/**
 */
export enum FontSizeType {
//   Medium,
//   XXSmall,
//   XSmall,
//   Small,
//   Large,
//   XLarge,
//   XXLarge,
//   Smaller,
//   Larger,
  Length,
  Percent
//   Undefined,
}

export enum ClipPathBasicShapeType {
    Polygon,
    Circle // 暂不支持
}

export enum ClipPathGeometryBoxType {
    MarginBox,
    BorderBox,
    PaddingBox,
    ContentBox
}

export enum BorderImageRepeat {
    Stretch = 0, // 拉伸源图像的边缘区域以填充每个边界之间的间隙。
    Repeat = 1,  // 源图像的边缘区域被平铺（重复）以填充每个边界之间的间隙。可以修剪瓷砖以实现适当的配合。
    Round = 2,   // 源图像的边缘区域被平铺（重复）以填充每个边界之间的间隙。可以拉伸瓷砖以实现适当的配合。
    Space = 3    // 源图像的边缘区域被平铺（重复）以填充每个边界之间的间隙。可以缩小瓷砖以实现适当的配合。
}