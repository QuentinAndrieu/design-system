// Public API. CSS is imported separately by consumers:
//   import "@quentinandrieu/design-system/styles.css";
//   import "@quentinandrieu/design-system/accents/iris.css";

// surfaces
export { Glass } from "./components/Glass";
export type { GlassProps } from "./components/Glass";

// actions
export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant } from "./components/Button";
export { IconButton } from "./components/IconButton";
export type { IconButtonProps } from "./components/IconButton";

// icon
export { Icon, iconNames } from "./components/Icon";
export type { IconProps, IconName } from "./components/Icon";

// data display
export { Chip, ChipGroup } from "./components/Chip";
export type { ChipProps } from "./components/Chip";
export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeVariant } from "./components/Badge";
export { Avatar } from "./components/Avatar";
export type { AvatarProps } from "./components/Avatar";
export { ProgressBar } from "./components/ProgressBar";
export type { ProgressBarProps } from "./components/ProgressBar";
export { ProgressRing } from "./components/ProgressRing";
export type { ProgressRingProps } from "./components/ProgressRing";
export { Thumbnail } from "./components/Thumbnail";
export type { ThumbnailProps } from "./components/Thumbnail";
export { Row } from "./components/Row";
export type { RowProps } from "./components/Row";
export { GroupLabel } from "./components/GroupLabel";
export type { GroupLabelProps } from "./components/GroupLabel";
export { SettingsGroup } from "./components/SettingsGroup";
export type { SettingsGroupProps } from "./components/SettingsGroup";

// layout
export { AppShell } from "./components/AppShell";
export type { AppShellProps } from "./components/AppShell";
export { AppHeader } from "./components/AppHeader";
export type { AppHeaderProps } from "./components/AppHeader";
export { ParallaxSheet } from "./components/ParallaxSheet";
export type { ParallaxSheetProps } from "./components/ParallaxSheet";
export { ConfigSheet } from "./components/ConfigSheet";
export type { ConfigSheetProps } from "./components/ConfigSheet";

// navigation
export { TabBar } from "./components/TabBar";
export type { TabBarProps, Tab } from "./components/TabBar";
export { SegmentedControl } from "./components/SegmentedControl";
export type {
  SegmentedControlProps,
  SegOption,
} from "./components/SegmentedControl";
export { WeekStrip } from "./components/WeekStrip";
export type { WeekStripProps, WeekDay } from "./components/WeekStrip";

// inputs
export { Field } from "./components/Field";
export type { FieldProps } from "./components/Field";
export { SearchField } from "./components/SearchField";
export type { SearchFieldProps } from "./components/SearchField";
export { Dropdown } from "./components/Dropdown";
export type { DropdownProps, DropdownOption } from "./components/Dropdown";
export { MultiSelect } from "./components/MultiSelect";
export type {
  MultiSelectProps,
  MultiSelectOption,
} from "./components/MultiSelect";
export { Slider } from "./components/Slider";
export type { SliderProps } from "./components/Slider";
export { Switch } from "./components/Switch";
export type { SwitchProps } from "./components/Switch";
export { Rating } from "./components/Rating";
export type { RatingProps } from "./components/Rating";

// overlays
export { Sheet } from "./components/Sheet";
export type { SheetProps } from "./components/Sheet";
export { SheetRow } from "./components/SheetRow";
export type { SheetRowProps } from "./components/SheetRow";
export { Modal } from "./components/Modal";
export type { ModalProps } from "./components/Modal";

// feedback
export { Skeleton } from "./components/Skeleton";
export type { SkeletonProps } from "./components/Skeleton";
export { Empty } from "./components/Empty";
export type { EmptyProps } from "./components/Empty";
export { ErrorBox } from "./components/ErrorBox";
export type { ErrorBoxProps } from "./components/ErrorBox";
export { Toast } from "./components/Toast";
export type { ToastProps } from "./components/Toast";
export { Toaster, toast } from "./components/ToastProvider";

// stats
export { StatTile, StatGrid } from "./components/Stat";
export type { StatTileProps } from "./components/Stat";
export { Donut } from "./components/Donut";
export type { DonutProps, DonutSegment } from "./components/Donut";
export { BarChart } from "./components/BarChart";
export type { BarChartProps, Bar } from "./components/BarChart";
