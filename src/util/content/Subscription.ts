const SUBSCRIPTION: Record<string, SUBSCRIPTIONS> = {
    free: {
        name: 'free',
        vault: 0,
    },
    vip: {
        name: 'vip',
        vault: 68,
    },
    svip: {
        name: 'svip',
        vault: 128,
    },
    ssvip: {
        name: 'ssvip',
        vault: 648,
    },
}

export type SUBSCRIPTIONS = {
    name: string
    vault: number
}

export default SUBSCRIPTION
