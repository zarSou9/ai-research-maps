// general

type SettingComponent = CheckBoxSetting | DropDownSetting;

type SettingBase = {
	id: string;
	title: string;
	note?: string;
};

type CheckBoxSetting = SettingBase & {
	type: 'check-box';
	value: boolean;
};

type DropDownSetting = SettingBase & {
	type: 'drop-down';
	options: string[];
	value: string;
};

type DropDownItem = {
	title: string;
	key?: string;
	metaKey?: boolean;
	shiftKey?: boolean;
	putAfter?: boolean;
	func: () => void;
};

// tree

type Node = {
	id: string;
	title: string;
	description?: string;
	mini_description?: string;
	breakdown?: Breakdown;
	otherBreakdowns?: Breakdown[];
	links?: { id: string; reason?: string }[];
	questions?: ResearchQuestion[];
	papers?: Paper[];
};

type Breakdown = {
	id: string;
	title?: string;
	sub_nodes: Node[];
	explanation?: string;
	references?: Paper[];
	paper?: Paper;
};

type Paper = {
	url: string;
	title: string;
	published_date?: string;
	abstract?: string;
	summary?: string;
	citation_count?: number;
};

type ResearchQuestion = {
	id: string;
	question: string;
	context?: string;
};

type PosNode = {
	node: Node;
	parent: Node | undefined;
	left?: number;
	top?: number;
	miniSubMiddles?: MiniMiddle[];
	descriptionDivHeight?: number;
	miniDivHeight?: number;
	children?: PosNode[];
};

type TitlePosNode = {
	node: Node;
	depth: number;
	width: number;
	color: string | undefined;
	left?: number;
	top?: number;
	children?: TitlePosNode[];
	posLinks?: TitlePosLink[];
};

type TitlePosLink = {
	id: string;
	posNode?: TitlePosNode;
	hiddenNode?: Node;
	reason?: string;
};

type CharSize = {
	textSize: number;
	charW: number;
	line_height?: number;
};

type TreeDefinition = {
	pathName: string;
	title: string;
	fullTree?: any;
	treeUrl?: string;
	note?: string;
	coverRootDescription: string;
	disableExpandAll?: boolean;
	leftSidePanelInitOpen?: boolean;
	breakdownName?: string;
	customSettings?: CustomTreeSettings;
};

type CustomTreeSettings = {
	titlesMode?: CustomHorizontalTreeSettings;
	defaultMode?: CustomVerticalTreeSettings;
};

type TreeSettings = {
	titlesMode: HorizontalTreeSettings;
	defaultMode: VerticalTreeSettings;
};

type CustomHorizontalTreeSettings = {
	horizontalSpacing?: number;
	siblingNodeSpacing?: number;
	nodeGroupSpacing?: number;
	avgTextCharSizes?: CharSize[];
	defaultTitleCharSize?: CharSize;
	horizontalSpacingAdditions?: number[];
	widthAddition?: number;
	baseColors?: string[];
	depthLimit?: number;
	nodeGroupSpacingAdditions?: number[];
	padding?: number;
	rootNodeColor?: string;
};

type HorizontalTreeSettings = {
	horizontalSpacing: number;
	siblingNodeSpacing: number;
	nodeGroupSpacing: number;
	avgTextCharSizes: CharSize[];
	defaultTitleCharSize: CharSize;
	horizontalSpacingAdditions: number[];
	widthAddition: number;
	baseColors: string[];
	padding: number;
	depthLimit?: number;
	nodeGroupSpacingAdditions?: number[];
	rootNodeColor?: string;
};

type CustomVerticalTreeSettings = {
	nodeWidth?: number;
	nodeHeight?: number;
	verticalSpacing?: number;
	siblingNodeSpacing?: number;
	nodeGroupSpacing?: number;
	padding?: number;
};

type VerticalTreeSettings = {
	nodeWidth: number;
	nodeHeight: number;
	verticalSpacing: number;
	siblingNodeSpacing: number;
	nodeGroupSpacing: number;
	padding: number;
};

type MiniMiddle = { x: number; y: number; id: string };

type HashMap = { [id: string]: string | undefined };

export {
	DropDownItem,
	HashMap,
	TreeDefinition,
	TitlePosLink,
	Node,
	Paper,
	PosNode,
	TitlePosNode,
	Breakdown,
	CharSize,
	CustomTreeSettings,
	TreeSettings,
	HorizontalTreeSettings,
	VerticalTreeSettings,
	CustomHorizontalTreeSettings,
	CustomVerticalTreeSettings,
	MiniMiddle,
	SettingComponent
};
