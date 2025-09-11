// src/types/order.ts
export interface UnifiedOrder {
    id: number | string;
    title: string;
    description: string;
    price: string;
    orderTime: string;
    status: 'pending' | 'in-progress' | 'completed' | 'queued';
    client: string;
    qqNumber: string;
    blocks: string[];
    type: string;
    queuePosition?: number;
    estimatedTime?: string;
}
