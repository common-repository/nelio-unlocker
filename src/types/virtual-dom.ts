// =======================================================
//   Node Types
// =======================================================

export type Node = Element | TextNode;

export type ElementContent = {
	readonly children: List< Node >;
	readonly props: List< Property >;
	readonly extraProps: List< ExtraProperty >;
	readonly ui: Dimensions;
};

export type Element =
	| A
	| Abbr
	| Address
	| Area
	| Article
	| Aside
	| Audio
	| Bdi
	| Bdo
	| Blockquote
	| Body
	| Br
	| Button
	| Canvas
	| Caption
	| Cite
	| Code
	| Col
	| Colgroup
	| Datalist
	| Dd
	| Del
	| Details
	| Dfn
	| Div
	| Dl
	| Dt
	| Em
	| Embed
	| Fieldset
	| Figcaption
	| Figure
	| Footer
	| Form
	| H1
	| H2
	| H3
	| H4
	| H5
	| H6
	| Head
	| Header
	| Hr
	| Iframe
	| Img
	| Input
	| Ins
	| Kbd
	| Label
	| Legend
	| Li
	| Main
	| MapNode
	| Mark
	| Meter
	| Nav
	| ObjectNode
	| Ol
	| Optgroup
	| Option
	| Output
	| P
	| Param
	| Picture
	| Pre
	| Progress
	| Q
	| S
	| Samp
	| Section
	| Select
	| Small
	| Source
	| Span
	| Strong
	| Sub
	| Summary
	| Sup
	| Svg
	| Table
	| Tbody
	| Td
	| Textarea
	| Tfoot
	| Th
	| Thead
	| Time
	| Title
	| Tr
	| Track
	| U
	| Ul
	| Var
	| Video
	| Wbr;

export type A = ElementContent & { readonly kind: 'A' };
export type Abbr = ElementContent & { readonly kind: 'ABBR' };
export type Address = ElementContent & { readonly kind: 'ADDRESS' };
export type Area = ElementContent & { readonly kind: 'AREA' };
export type Article = ElementContent & { readonly kind: 'ARTICLE' };
export type Aside = ElementContent & { readonly kind: 'ASIDE' };
export type Audio = ElementContent & { readonly kind: 'AUDIO' };
export type Bdi = ElementContent & { readonly kind: 'BDI' };
export type Bdo = ElementContent & { readonly kind: 'BDO' };
export type Blockquote = ElementContent & { readonly kind: 'BLOCKQUOTE' };
export type Body = ElementContent & { readonly kind: 'BODY' };
export type Br = ElementContent & { readonly kind: 'BR' };
export type Button = ElementContent & { readonly kind: 'BUTTON' };
export type Canvas = ElementContent & { readonly kind: 'CANVAS' };
export type Caption = ElementContent & { readonly kind: 'CAPTION' };
export type Cite = ElementContent & { readonly kind: 'CITE' };
export type Code = ElementContent & { readonly kind: 'CODE' };
export type Col = ElementContent & { readonly kind: 'COL' };
export type Colgroup = ElementContent & { readonly kind: 'COLGROUP' };
export type Datalist = ElementContent & { readonly kind: 'DATALIST' };
export type Dd = ElementContent & { readonly kind: 'DD' };
export type Del = ElementContent & { readonly kind: 'DEL' };
export type Details = ElementContent & { readonly kind: 'DETAILS' };
export type Dfn = ElementContent & { readonly kind: 'DFN' };
export type Div = ElementContent & { readonly kind: 'DIV' };
export type Dl = ElementContent & { readonly kind: 'DL' };
export type Dt = ElementContent & { readonly kind: 'DT' };
export type Em = ElementContent & { readonly kind: 'EM' };
export type Embed = ElementContent & { readonly kind: 'EMBED' };
export type Fieldset = ElementContent & { readonly kind: 'FIELDSET' };
export type Figcaption = ElementContent & { readonly kind: 'FIGCAPTION' };
export type Figure = ElementContent & { readonly kind: 'FIGURE' };
export type Footer = ElementContent & { readonly kind: 'FOOTER' };
export type Form = ElementContent & { readonly kind: 'FORM' };
export type H1 = ElementContent & { readonly kind: 'H1' };
export type H2 = ElementContent & { readonly kind: 'H2' };
export type H3 = ElementContent & { readonly kind: 'H3' };
export type H4 = ElementContent & { readonly kind: 'H4' };
export type H5 = ElementContent & { readonly kind: 'H5' };
export type H6 = ElementContent & { readonly kind: 'H6' };
export type Head = ElementContent & { readonly kind: 'HEAD' };
export type Header = ElementContent & { readonly kind: 'HEADER' };
export type Hr = ElementContent & { readonly kind: 'HR' };
export type Iframe = ElementContent & { readonly kind: 'IFRAME' };
export type Img = ElementContent & { readonly kind: 'IMG' };
export type Input = ElementContent & { readonly kind: 'INPUT' };
export type Ins = ElementContent & { readonly kind: 'INS' };
export type Kbd = ElementContent & { readonly kind: 'KBD' };
export type Label = ElementContent & { readonly kind: 'LABEL' };
export type Legend = ElementContent & { readonly kind: 'LEGEND' };
export type Li = ElementContent & { readonly kind: 'LI' };
export type Main = ElementContent & { readonly kind: 'MAIN' };
export type MapNode = ElementContent & { readonly kind: 'MAP' };
export type Mark = ElementContent & { readonly kind: 'MARK' };
export type Meter = ElementContent & { readonly kind: 'METER' };
export type Nav = ElementContent & { readonly kind: 'NAV' };
export type ObjectNode = ElementContent & { readonly kind: 'OBJECT' };
export type Ol = ElementContent & { readonly kind: 'OL' };
export type Optgroup = ElementContent & { readonly kind: 'OPTGROUP' };
export type Option = ElementContent & { readonly kind: 'OPTION' };
export type Output = ElementContent & { readonly kind: 'OUTPUT' };
export type P = ElementContent & { readonly kind: 'P' };
export type Param = ElementContent & { readonly kind: 'PARAM' };
export type Picture = ElementContent & { readonly kind: 'PICTURE' };
export type Pre = ElementContent & { readonly kind: 'PRE' };
export type Progress = ElementContent & { readonly kind: 'PROGRESS' };
export type Q = ElementContent & { readonly kind: 'Q' };
export type S = ElementContent & { readonly kind: 'S' };
export type Samp = ElementContent & { readonly kind: 'SAMP' };
export type Section = ElementContent & { readonly kind: 'SECTION' };
export type Select = ElementContent & { readonly kind: 'SELECT' };
export type Small = ElementContent & { readonly kind: 'SMALL' };
export type Source = ElementContent & { readonly kind: 'SOURCE' };
export type Span = ElementContent & { readonly kind: 'SPAN' };
export type Strong = ElementContent & { readonly kind: 'STRONG' };
export type Sub = ElementContent & { readonly kind: 'SUB' };
export type Summary = ElementContent & { readonly kind: 'SUMMARY' };
export type Sup = ElementContent & { readonly kind: 'SUP' };
export type Svg = ElementContent & { readonly kind: 'SVG' };
export type Table = ElementContent & { readonly kind: 'TABLE' };
export type Tbody = ElementContent & { readonly kind: 'TBODY' };
export type Td = ElementContent & { readonly kind: 'TD' };
export type Textarea = ElementContent & { readonly kind: 'TEXTAREA' };
export type Tfoot = ElementContent & { readonly kind: 'TFOOT' };
export type Th = ElementContent & { readonly kind: 'TH' };
export type Thead = ElementContent & { readonly kind: 'THEAD' };
export type Time = ElementContent & { readonly kind: 'TIME' };
export type Title = ElementContent & { readonly kind: 'TITLE' };
export type Tr = ElementContent & { readonly kind: 'TR' };
export type Track = ElementContent & { readonly kind: 'TRACK' };
export type U = ElementContent & { readonly kind: 'U' };
export type Ul = ElementContent & { readonly kind: 'UL' };
export type Var = ElementContent & { readonly kind: 'VAR' };
export type Video = ElementContent & { readonly kind: 'VIDEO' };
export type Wbr = ElementContent & { readonly kind: 'WBR' };

export type TextNode = {
	readonly kind: '#text';
	readonly content: string;
	readonly ui: Dimensions;
};

export type Property = {
	readonly name: PropertyName;
	readonly value: string;
};

export type ExtraProperty = {
	readonly name: ExtraPropertyName;
	readonly value: string;
};

export type Dimensions = {
	readonly x: number;
	readonly y: number;
	readonly w: number;
	readonly h: number;
};

export enum PropertyName { // eslint-disable-line no-shadow
	ACTION = 'action',
	ALT = 'alt',
	ARIA_HIDDEN = 'aria-hidden',
	AUTOPLAY = 'autoplay',
	CLASSNAME = 'class',
	DATA_SRC = 'data-src',
	DATA_LAZY_SRC = 'data-lazy-src',
	HREF = 'href',
	ID = 'id',
	LOOP = 'loop',
	ROLE = 'role',
	SRC = 'src',
	TARGET = 'target',
}

export enum ExtraPropertyName { // eslint-disable-line no-shadow
	ALIGNMENT = 'alignment',
	BACKGROUND_COLOR = 'background-color',
	BACKGROUND_IMAGE = 'background-image',
	BORDER_RADIUS = 'border-radius',
	DISPLAY = 'display',
	FONT_SIZE = 'font-size',
	FOREGROUND_COLOR = 'foreground-color',
	IS_INLINE = 'is-inline',
	IS_DARK_IMAGE = 'is-dark-image',
	MEDIA_LIBRARY_BGIMG_ID = 'media-library-bgimg-id',
	MEDIA_LIBRARY_SRC_ID = 'media-library-src-id',
	STACK_ORDER = 'stack-order',
	TEXT_TRANSFORM = 'text-transform',
	VISIBILITY = 'visibility',
}

// =======================================================
//   Helper Functions
// =======================================================

export const isText = ( n: Node ): n is TextNode => '#text' === n.kind;
export const isElement = ( n: Node ): n is Element => ! isText( n );

export const isA = ( n: Node ): n is A => 'A' === n.kind;
export const isAbbr = ( n: Node ): n is Abbr => 'ABBR' === n.kind;
export const isAddress = ( n: Node ): n is Address => 'ADDRESS' === n.kind;
export const isArea = ( n: Node ): n is Area => 'AREA' === n.kind;
export const isArticle = ( n: Node ): n is Article => 'ARTICLE' === n.kind;
export const isAside = ( n: Node ): n is Aside => 'ASIDE' === n.kind;
export const isAudio = ( n: Node ): n is Audio => 'AUDIO' === n.kind;
export const isBdi = ( n: Node ): n is Bdi => 'BDI' === n.kind;
export const isBdo = ( n: Node ): n is Bdo => 'BDO' === n.kind;
export const isBlockquote = ( n: Node ): n is Blockquote =>
	'BLOCKQUOTE' === n.kind;
export const isBody = ( n: Node ): n is Body => 'BODY' === n.kind;
export const isBr = ( n: Node ): n is Br => 'BR' === n.kind;
export const isButton = ( n: Node ): n is Button => 'BUTTON' === n.kind;
export const isCanvas = ( n: Node ): n is Canvas => 'CANVAS' === n.kind;
export const isCaption = ( n: Node ): n is Caption => 'CAPTION' === n.kind;
export const isCite = ( n: Node ): n is Cite => 'CITE' === n.kind;
export const isCode = ( n: Node ): n is Code => 'CODE' === n.kind;
export const isCol = ( n: Node ): n is Col => 'COL' === n.kind;
export const isColgroup = ( n: Node ): n is Colgroup => 'COLGROUP' === n.kind;
export const isDatalist = ( n: Node ): n is Datalist => 'DATALIST' === n.kind;
export const isDd = ( n: Node ): n is Dd => 'DD' === n.kind;
export const isDel = ( n: Node ): n is Del => 'DEL' === n.kind;
export const isDetails = ( n: Node ): n is Details => 'DETAILS' === n.kind;
export const isDfn = ( n: Node ): n is Dfn => 'DFN' === n.kind;
export const isDiv = ( n: Node ): n is Div => 'DIV' === n.kind;
export const isDl = ( n: Node ): n is Dl => 'DL' === n.kind;
export const isDt = ( n: Node ): n is Dt => 'DT' === n.kind;
export const isEm = ( n: Node ): n is Em => 'EM' === n.kind;
export const isEmbed = ( n: Node ): n is Embed => 'EMBED' === n.kind;
export const isFieldset = ( n: Node ): n is Fieldset => 'FIELDSET' === n.kind;
export const isFigcaption = ( n: Node ): n is Figcaption =>
	'FIGCAPTION' === n.kind;
export const isFigure = ( n: Node ): n is Figure => 'FIGURE' === n.kind;
export const isFooter = ( n: Node ): n is Footer => 'FOOTER' === n.kind;
export const isForm = ( n: Node ): n is Form => 'FORM' === n.kind;
export const isH1 = ( n: Node ): n is H1 => 'H1' === n.kind;
export const isH2 = ( n: Node ): n is H2 => 'H2' === n.kind;
export const isH3 = ( n: Node ): n is H3 => 'H3' === n.kind;
export const isH4 = ( n: Node ): n is H4 => 'H4' === n.kind;
export const isH5 = ( n: Node ): n is H5 => 'H5' === n.kind;
export const isH6 = ( n: Node ): n is H6 => 'H6' === n.kind;
export const isHead = ( n: Node ): n is Head => 'HEAD' === n.kind;
export const isHeader = ( n: Node ): n is Header => 'HEADER' === n.kind;
export const isHr = ( n: Node ): n is Hr => 'HR' === n.kind;
export const isIframe = ( n: Node ): n is Iframe => 'IFRAME' === n.kind;
export const isImg = ( n: Node ): n is Img => 'IMG' === n.kind;
export const isInput = ( n: Node ): n is Input => 'INPUT' === n.kind;
export const isIns = ( n: Node ): n is Ins => 'INS' === n.kind;
export const isKbd = ( n: Node ): n is Kbd => 'KBD' === n.kind;
export const isLabel = ( n: Node ): n is Label => 'LABEL' === n.kind;
export const isLegend = ( n: Node ): n is Legend => 'LEGEND' === n.kind;
export const isLi = ( n: Node ): n is Li => 'LI' === n.kind;
export const isMain = ( n: Node ): n is Main => 'MAIN' === n.kind;
export const isMapNode = ( n: Node ): n is MapNode => 'MAP' === n.kind;
export const isMark = ( n: Node ): n is Mark => 'MARK' === n.kind;
export const isMeter = ( n: Node ): n is Meter => 'METER' === n.kind;
export const isNav = ( n: Node ): n is Nav => 'NAV' === n.kind;
export const isObjectNode = ( n: Node ): n is ObjectNode => 'OBJECT' === n.kind;
export const isOl = ( n: Node ): n is Ol => 'OL' === n.kind;
export const isOptgroup = ( n: Node ): n is Optgroup => 'OPTGROUP' === n.kind;
export const isOption = ( n: Node ): n is Option => 'OPTION' === n.kind;
export const isOutput = ( n: Node ): n is Output => 'OUTPUT' === n.kind;
export const isP = ( n: Node ): n is P => 'P' === n.kind;
export const isParam = ( n: Node ): n is Param => 'PARAM' === n.kind;
export const isPicture = ( n: Node ): n is Picture => 'PICTURE' === n.kind;
export const isPre = ( n: Node ): n is Pre => 'PRE' === n.kind;
export const isProgress = ( n: Node ): n is Progress => 'PROGRESS' === n.kind;
export const isQ = ( n: Node ): n is Q => 'Q' === n.kind;
export const isSamp = ( n: Node ): n is Samp => 'SAMP' === n.kind;
export const isSection = ( n: Node ): n is Section => 'SECTION' === n.kind;
export const isSelect = ( n: Node ): n is Select => 'SELECT' === n.kind;
export const isSmall = ( n: Node ): n is Small => 'SMALL' === n.kind;
export const isSource = ( n: Node ): n is Source => 'SOURCE' === n.kind;
export const isSpan = ( n: Node ): n is Span => 'SPAN' === n.kind;
export const isStrong = ( n: Node ): n is Strong => 'STRONG' === n.kind;
export const isSub = ( n: Node ): n is Sub => 'SUB' === n.kind;
export const isSummary = ( n: Node ): n is Summary => 'SUMMARY' === n.kind;
export const isSup = ( n: Node ): n is Sup => 'SUP' === n.kind;
export const isSvg = ( n: Node ): n is Svg => 'SVG' === n.kind;
export const isTable = ( n: Node ): n is Table => 'TABLE' === n.kind;
export const isTbody = ( n: Node ): n is Tbody => 'TBODY' === n.kind;
export const isTd = ( n: Node ): n is Td => 'TD' === n.kind;
export const isTextarea = ( n: Node ): n is Textarea => 'TEXTAREA' === n.kind;
export const isTfoot = ( n: Node ): n is Tfoot => 'TFOOT' === n.kind;
export const isTh = ( n: Node ): n is Th => 'TH' === n.kind;
export const isThead = ( n: Node ): n is Thead => 'THEAD' === n.kind;
export const isTime = ( n: Node ): n is Time => 'TIME' === n.kind;
export const isTitle = ( n: Node ): n is Title => 'TITLE' === n.kind;
export const isTr = ( n: Node ): n is Tr => 'TR' === n.kind;
export const isTrack = ( n: Node ): n is Track => 'TRACK' === n.kind;
export const isU = ( n: Node ): n is U => 'U' === n.kind;
export const isUl = ( n: Node ): n is Ul => 'UL' === n.kind;
export const isVar = ( n: Node ): n is Var => 'VAR' === n.kind;
export const isVideo = ( n: Node ): n is Var => 'VIDEO' === n.kind;
export const isWbr = ( n: Node ): n is Wbr => 'WBR' === n.kind;

export function makeNode( nodeName: string ): Node | false {
	const kind = getHtml5NodeName( nodeName );
	const ui: Dimensions = { x: 0, y: 0, w: 0, h: 0 };
	const props: ElementContent = {
		children: [],
		props: [],
		extraProps: [],
		ui,
	};

	switch ( kind ) {
		case 'A':
			return { kind, ...props };
		case 'ABBR':
			return { kind, ...props };
		case 'ADDRESS':
			return { kind, ...props };
		case 'AREA':
			return { kind, ...props };
		case 'ARTICLE':
			return { kind, ...props };
		case 'ASIDE':
			return { kind, ...props };
		case 'AUDIO':
			return { kind, ...props };
		case 'BDI':
			return { kind, ...props };
		case 'BDO':
			return { kind, ...props };
		case 'BLOCKQUOTE':
			return { kind, ...props };
		case 'BODY':
			return { kind, ...props };
		case 'BR':
			return { kind, ...props };
		case 'BUTTON':
			return { kind, ...props };
		case 'CANVAS':
			return { kind, ...props };
		case 'CAPTION':
			return { kind, ...props };
		case 'CITE':
			return { kind, ...props };
		case 'CODE':
			return { kind, ...props };
		case 'COL':
			return { kind, ...props };
		case 'COLGROUP':
			return { kind, ...props };
		case 'DATALIST':
			return { kind, ...props };
		case 'DD':
			return { kind, ...props };
		case 'DEL':
			return { kind, ...props };
		case 'DETAILS':
			return { kind, ...props };
		case 'DFN':
			return { kind, ...props };
		case 'DIV':
			return { kind, ...props };
		case 'DL':
			return { kind, ...props };
		case 'DT':
			return { kind, ...props };
		case 'EM':
			return { kind, ...props };
		case 'EMBED':
			return { kind, ...props };
		case 'FIELDSET':
			return { kind, ...props };
		case 'FIGCAPTION':
			return { kind, ...props };
		case 'FIGURE':
			return { kind, ...props };
		case 'FOOTER':
			return { kind, ...props };
		case 'FORM':
			return { kind, ...props };
		case 'H1':
			return { kind, ...props };
		case 'H2':
			return { kind, ...props };
		case 'H3':
			return { kind, ...props };
		case 'H4':
			return { kind, ...props };
		case 'H5':
			return { kind, ...props };
		case 'H6':
			return { kind, ...props };
		case 'HEAD':
			return { kind, ...props };
		case 'HEADER':
			return { kind, ...props };
		case 'HR':
			return { kind, ...props };
		case 'IFRAME':
			return { kind, ...props };
		case 'IMG':
			return { kind, ...props };
		case 'INPUT':
			return { kind, ...props };
		case 'INS':
			return { kind, ...props };
		case 'KBD':
			return { kind, ...props };
		case 'LABEL':
			return { kind, ...props };
		case 'LEGEND':
			return { kind, ...props };
		case 'LI':
			return { kind, ...props };
		case 'MAIN':
			return { kind, ...props };
		case 'MAP':
			return { kind, ...props };
		case 'MARK':
			return { kind, ...props };
		case 'METER':
			return { kind, ...props };
		case 'NAV':
			return { kind, ...props };
		case 'OBJECT':
			return { kind, ...props };
		case 'OL':
			return { kind, ...props };
		case 'OPTGROUP':
			return { kind, ...props };
		case 'OPTION':
			return { kind, ...props };
		case 'OUTPUT':
			return { kind, ...props };
		case 'P':
			return { kind, ...props };
		case 'PARAM':
			return { kind, ...props };
		case 'PICTURE':
			return { kind, ...props };
		case 'PRE':
			return { kind, ...props };
		case 'PROGRESS':
			return { kind, ...props };
		case 'Q':
			return { kind, ...props };
		case 'S':
			return { kind, ...props };
		case 'SAMP':
			return { kind, ...props };
		case 'SECTION':
			return { kind, ...props };
		case 'SELECT':
			return { kind, ...props };
		case 'SMALL':
			return { kind, ...props };
		case 'SOURCE':
			return { kind, ...props };
		case 'SPAN':
			return { kind, ...props };
		case 'STRONG':
			return { kind, ...props };
		case 'SUB':
			return { kind, ...props };
		case 'SUMMARY':
			return { kind, ...props };
		case 'SUP':
			return { kind, ...props };
		case 'SVG':
			return { kind, ...props };
		case 'TABLE':
			return { kind, ...props };
		case 'TBODY':
			return { kind, ...props };
		case 'TD':
			return { kind, ...props };
		case 'TEXTAREA':
			return { kind, ...props };
		case 'TFOOT':
			return { kind, ...props };
		case 'TH':
			return { kind, ...props };
		case 'THEAD':
			return { kind, ...props };
		case 'TIME':
			return { kind, ...props };
		case 'TITLE':
			return { kind, ...props };
		case 'TR':
			return { kind, ...props };
		case 'TRACK':
			return { kind, ...props };
		case 'U':
			return { kind, ...props };
		case 'UL':
			return { kind, ...props };
		case 'VAR':
			return { kind, ...props };
		case 'VIDEO':
			return { kind, ...props };
		case 'WBR':
			return { kind, ...props };
		case '#text':
			return { kind: '#text', content: '', ui };
		default:
			return false;
	} //end switch
} //end makeNode()

function getHtml5NodeName( nodeName: string ): string {
	if ( /^#/.test( nodeName ) ) {
		return nodeName;
	} //end if

	if ( 'B' === nodeName.toUpperCase() ) {
		return 'STRONG';
	} //end if

	if ( 'FONT' === nodeName.toUpperCase() ) {
		return 'SPAN';
	} //end if

	if ( 'I' === nodeName.toUpperCase() ) {
		return 'EM';
	} //end if

	if ( 'S' === nodeName.toUpperCase() ) {
		return 'DEL';
	} //end if

	return nodeName.toUpperCase();
} //end getHtml5NodeName()

// =======================================================
//   Serialization
// =======================================================

export type SerializedNode = {
	readonly k: string;
	readonly c?: List< SerializedNode > | string;
	readonly p?: List< { readonly n: PropertyName; readonly v: string } >;
	readonly ep?: List< { readonly n: ExtraPropertyName; readonly v: string } >;
	readonly ui?: Dimensions;
};

export function serialize( node: Node ): SerializedNode {
	if ( '#text' === node.kind ) {
		return {
			k: '#text',
			c: node.content,
			...( 0 < node.content.trim().length && { ui: node.ui } ),
		};
	} //end if

	const children: List< SerializedNode > = node.children
		.map( serialize )
		.filter( ( child: SerializedNode ) => {
			if ( '#text' === child.k ) {
				return !! child.c && !! child.c.length;
			} //end if

			return true;
		} );

	const { props, extraProps, ui } = node;
	const hasDimensions = ui.x !== 0 || ui.y !== 0 || ui.w !== 0 || ui.h !== 0;

	return {
		k: node.kind,
		...( children.length && { c: children } ),
		...( props.length && {
			p: props.map( ( prop: Property ) => ( {
				n: prop.name,
				v: prop.value,
			} ) ),
		} ),
		...( extraProps.length && {
			ep: extraProps.map( ( prop: ExtraProperty ) => ( {
				n: prop.name,
				v: prop.value,
			} ) ),
		} ),
		...( hasDimensions && { ui } ),
	};
} //end serialize()

export function unserialize( serializedNode: SerializedNode ): Node | false {
	const node = makeNode( serializedNode.k );
	if ( ! node ) {
		return false;
	} //end if

	if ( '#text' === node.kind && 'string' === typeof serializedNode.c ) {
		return {
			...node,
			content: serializedNode.c,
			ui: serializedNode.ui ?? node.ui,
		};
	} //end if

	if ( '#text' === node.kind || 'string' === typeof serializedNode.c ) {
		return false;
	} //end if

	const serializedChildren: List< SerializedNode > = serializedNode.c || [];
	const children = serializedChildren
		.map( unserialize )
		.reduce( ( r: List< Node >, c ) => ( c ? [ ...r, c ] : r ), [] );

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const map = < Ti extends any, To extends any >(
		list: List< Ti > | undefined,
		fn: ( x: Ti ) => To
	): List< To > => {
		if ( ! list ) {
			return [] as List< To >;
		} //end if
		return list.map( fn );
	};
	/* eslint-enable @typescript-eslint/no-explicit-any */

	return {
		...node,
		children,
		props: map(
			serializedNode.p,
			( prop: { readonly n: PropertyName; readonly v: string } ) => ( {
				name: prop.n,
				value: prop.v,
			} )
		),
		extraProps: map(
			serializedNode.ep,
			( prop: {
				readonly n: ExtraPropertyName;
				readonly v: string;
			} ) => ( {
				name: prop.n,
				value: prop.v,
			} )
		),
		ui: serializedNode.ui ?? node.ui,
	};
} //end unserialize()

export function getImageSrc( img: Img ): string {
	const SRC_PROP_NAMES = [
		PropertyName.DATA_LAZY_SRC,
		PropertyName.DATA_SRC,
		PropertyName.SRC,
	];

	for ( const propName of SRC_PROP_NAMES ) {
		const prop = img.props.find( ( p ) => p.name === propName );
		if ( prop && prop.value ) {
			return prop.value;
		} //end if
	} //end for
	return '';
} //end getImageSrc()

export function getBackgroundImage( el: Element ): string {
	const bg = el.extraProps.find(
		( p ) => p.name === ExtraPropertyName.BACKGROUND_IMAGE
	);
	if ( ! bg || ! bg.value ) {
		return '';
	} //end if

	const re = /url\([^)]+\)/i;
	if ( ! re.test( bg.value ) ) {
		return '';
	} //end if

	const url = ( re.exec( bg.value ) ?? [] )[ 0 ] || '';
	return url.replace( /^url\(\s*['"]?/, '' ).replace( /['"]?\s*\)$/, '' );
} //end getBackgroundImage()

export function isUrlProp( prop: Property ): boolean {
	const urlPropertyNames = [
		PropertyName.ACTION,
		PropertyName.DATA_SRC,
		PropertyName.DATA_LAZY_SRC,
		PropertyName.HREF,
		PropertyName.SRC,
	];
	return urlPropertyNames.includes( prop.name );
} //end isUrlProp()
