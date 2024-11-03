import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type ModpackId = string

export type ModId = string

export type Mod = {
	id: ModId
	name: string
}

export type ModlistState = {
	entities: Record<ModId, Mod>
	ids: ModId[]
	selectedModId?: ModId
}

export type Modpack = {
	id: ModpackId
	name: string
	description: string
	modlist: ModlistState
}

export type InitialModpack = {
	id: ModpackId
	name: string
	description: string
	modlist: string[]
}

type ModpacksState = {
	entities: Record<ModpackId, Modpack>
	ids: ModpackId[]
	selectedModpackId?: ModpackId
}

export const initialModpacksData: InitialModpack[] = [
	{
		id: uuidv4(),
		name: 'StaTech Industry',
		description:
			"StaTech Industry (pronounced stat-ik in-duh-stree) is a quest-driven modpack for Minecraft 1.19.2 based around the Modern Industrialization mod. With over 750 quests and extensively modified progression, you'll be diving into designing processing lines for a multitude of materials and components, with the ultimate goal of total automation. While the main focus of the mod is Modern Industrialization, this pack also includes TechReborn, Create, Ad Astra, and Applied Energistics 2 to fully flesh out the tech-side side of the pack (Don't worry Create is only used for one or two things early-game and can be ignored for the rest of the pack if you want). In addition, the pack also includes Spectrum and Wizards, which offers an optional side-experience of exploring a World of Magic that unlocks helpful items to help you in your overall journey!",
		modlist: [
			'Modern Industrialization',
			'Tech Reborn',
			'Create',
			'Ad Astra',
			'Applied Energistics 2',
			'Spectrum',
			'Wizards',
			'JEI (Just Enough Items)',
			'AppleSkin',
			'Fabric API',
			'Roughly Enough Items',
			'Industrial Revolution',
			'Advanced Generators',
			'Botania',
			'Thermal Expansion',
			'Mekanism',
			'Chisel',
			'Refined Storage',
			'Immersive Engineering',
			'Quark',
			'Storage Drawers',
			'Draconic Evolution',
			'Blood Magic',
			'Mystical Agriculture',
			'Extreme Reactors',
			'The Twilight Forest',
		],
	},
	{
		id: uuidv4(),
		name: 'Create+',
		description:
			"Create+ is a vanilla+ modpack focused on Create, it's addons, and the experience you have using them. This is half the reason I made this pack. All the vanilla+ packs I could find were just... not. Well, at least under my definition of vanilla+. The only big content mod in this pack is Create, and I guess its addons as well, because thats the focus of the pack. Otherwise, there's only simple additions, tweaks, an imroved experience, the best type of gear is still netherite, and the game remains about as balanced and polished as vanilla. With the best performance mods for forge, from the small to the big, mixed together perfectly so no optimizations conflict, you won't find a better experience creating machines with shaders on. Oh, and all the laggy mods (I'm looking at you sound physics remastered) aren't in this pack either, because that would ruin the point of those optimizations I spent all that time on.",
		modlist: [
			'Create',
			"Create: Steam 'n' Rails",
			'Create: Ore Excavation',
			'Create Jetpack',
			'Create: Curios Jetpack',
			'Create: Structures',
			'Create: Copycats Plus',
			'Create: New Age',
			'Create: Old Infrastructure',
			'Curios API',
			'JEI (Just Enough Items)',
			'AppleSkin',
			'Botarium',
			'Canary',
			'Collective',
			'Embeddium',
			'KonKrete',
			'Kotlin for Forge',
			'melody',
			'Modpack Manager',
			'WTHIT (What The Hell Is That)',
			'WTHIT Harvestability',
			'Custom Credits',
			'Bad Packets',
		],
	},
	{
		id: uuidv4(),
		name: 'All the Mods 9 - ATM9',
		description:
			'ATM9 has over 400 mods and countless quests and a built in proper endgame. Can you craft the ATM Star? Do you dare take on the Gregstar? All the Mods started out as a private pack for just a few friends of mine that turned into something others wanted to play! It has all the basics that most other "big name" packs include but with a nice mix of some of newer or lesser-known mods as well. In All the Mods 9 we will continue the tradition adding many new mods while going for more stability. Does "All the Mods" really contain ALL THE MODS? No, of course not.',
		modlist: [
			'Absent by Design',
			'Ad Astra',
			'Ad Astra: Giselle Addon',
			'Additional Enchanted Miner',
			'Additional Lanterns',
			'Additional Lights',
			'Advanced Generators',
			'Advanced Peripherals',
			'AE Additions - ExtraCells2 Fork',
			'AE2 Import Export Card',
			'AE2 Things [Forge]',
			'AEInfinityBooster',
			'Aether: Lost Content Addon',
			'AI Improvements',
			'AIOT Botania',
			'Alchemistry',
			'AlchemyLib',
			'All The Tweaks',
			'Applied Energistics 2',
			'Botania',
			'Blood Magic',
			'Draconic Evolution',
			'Thermal Expansion',
			'Thermal Foundation',
			'Mekanism',
			'Create',
			'Immersive Engineering',
			'Quark',
			'Tinkers Construct',
			'Refined Storage',
			'Industrial Foregoing',
			'Extreme Reactors',
			'The Twilight Forest',
			'Ender IO',
			'Mystical Agriculture',
			'Flux Networks',
			'Storage Drawers',
		],
	},
]

const initialModpacksState: ModpacksState = {
	entities: {},
	ids: [],
	selectedModpackId: undefined,
}

export const modpacksSlice = createSlice({
	name: 'modpacks',
	initialState: initialModpacksState,
	selectors: {
		selectSelectedModpack: (state: ModpacksState) =>
			state.entities[state.selectedModpackId!],
		selectSortedModpacks: createSelector(
			(state: ModpacksState) => state.ids,
			(state: ModpacksState) => state.entities,
			(ids, entities) =>
				ids
					.map(id => entities[id])
					.sort((a, b) => a.name.localeCompare(b.name)),
		),
		selectSortedModlist: createSelector(
			(state: ModpacksState) =>
				state.entities[state.selectedModpackId!].modlist.ids,
			(state: ModpacksState) =>
				state.entities[state.selectedModpackId!].modlist.entities,
			(ids, entities) =>
				ids
					.map(id => entities[id])
					.sort((a, b) => a.name.localeCompare(b.name)),
		),
	},
	reducers: {
		stored: (
			state,
			action: PayloadAction<{
				modpacks: InitialModpack[]
			}>,
		) => {
			const { modpacks } = action.payload
			state.entities = Object.fromEntries(
				modpacks.map(modpack => {
					const mods = modpack.modlist.map(name => ({
						id: uuidv4(),
						name,
					}))
					return [
						modpack.id,
						{
							...modpack,
							id: modpack.id,
							modlist: {
								entities: Object.fromEntries(
									mods.map(mod => [mod.id, mod]),
								),
								ids: mods.map(mod => mod.id),
								selectedModId: undefined,
							},
						},
					]
				}),
			)
			state.ids = modpacks.map(modpack => modpack.id)
			state.selectedModpackId = modpacks[0]?.id
		},
		select: (state, action: PayloadAction<{ modpackId: ModpackId }>) => {
			state.selectedModpackId = action.payload.modpackId
		},
		add: (state, action: PayloadAction<{ modpack: InitialModpack }>) => {
			const { modpack } = action.payload
			const mods = modpack.modlist.map(name => ({
				id: uuidv4(),
				name,
			}))
			state.entities[modpack.id] = {
				id: modpack.id,
				name: modpack.name,
				description: modpack.description,
				modlist: {
					entities: Object.fromEntries(
						mods.map(mod => [mod.id, mod]),
					),
					ids: mods.map(mod => mod.id),
					selectedModId: undefined,
				},
			}
			state.ids.push(modpack.id)
		},
	},
})
