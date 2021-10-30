export interface MenuUser {
	color: string,
	icon: string,
	id: number,
	name: string,
	route: string,
	subMenuItem: Array<SubMenuItem>
}

interface SubMenuItem {
	id: number,
	menuItem: any,
	menuItemId: number,
	name: string,
	order: number,
	route: string,
	status: null
	statusId: number
}
