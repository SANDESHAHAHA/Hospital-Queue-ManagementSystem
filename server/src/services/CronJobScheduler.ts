import { Pool } from 'pg'
import https from 'https'
import { URL } from 'url'

const RENDER_APP_URL = process.env.RENDER_APP_URL || ''
const RENDER_PING_INTERVAL_MINUTES = Number(process.env.RENDER_PING_INTERVAL_MINUTES || '15')

const POSTGRES_CONNECTION = process.env.CONNECTION_STRING || ''
const POSTGRES_PING_INTERVAL_DAYS = Number(process.env.POSTGRES_PING_INTERVAL_DAYS || '7')

const pool = POSTGRES_CONNECTION ? new Pool({ connectionString: POSTGRES_CONNECTION }) : null

async function pingRender(): Promise<void> {
    if (!RENDER_APP_URL) {
        console.log('[CronJob] ⏭️  Skipping Render ping: RENDER_APP_URL not configured')
        return
    }

    try {
        const response = await (globalThis as any).fetch(RENDER_APP_URL, {
            method: 'GET',
            timeout: 10000
        })
        console.log(`[CronJob] ✅ Render ping successful: ${RENDER_APP_URL} → ${response.status}`)
    } catch (err: any) {
        console.error(`[CronJob] ❌ Render ping failed: ${err?.message || err}`)
    }
}


async function pingPostgres(): Promise<void> {
    if (!pool) {
        console.log('[CronJob] ⏭️  Skipping Postgres ping: CONNECTION_STRING not configured')
        return
    }

    try {
        const result = await pool.query('SELECT NOW()')
        console.log(`[CronJob] ✅ Postgres ping successful: ${result.rows[0].now}`)
    } catch (err: any) {
        console.error(`[CronJob] ❌ Postgres ping failed: ${err?.message || err}`)
    }
}

export function startCronJobs(): void {
    console.log('[CronJob] 🚀 Starting cron job scheduler...')

    // Run Render ping immediately and then every 15 minutes
    const renderIntervalMs = Math.max(1, RENDER_PING_INTERVAL_MINUTES) * 60 * 1000
    console.log(`[CronJob] ⏰ Render will be pinged every ${RENDER_PING_INTERVAL_MINUTES} minutes`)
    
    void pingRender() // Run immediately
    setInterval(() => {
        void pingRender()
    }, renderIntervalMs)

    const postgresIntervalMs = Math.max(1, POSTGRES_PING_INTERVAL_DAYS) * 24 * 60 * 60 * 1000
    console.log(`[CronJob] ⏰ Postgres will be pinged every ${POSTGRES_PING_INTERVAL_DAYS} days`)
    
    void pingPostgres() // Run immediately
    setInterval(() => {
        void pingPostgres()
    }, postgresIntervalMs)

    console.log('[CronJob] ✨ Cron jobs initialized successfully')
}


export async function stopCronJobs(): Promise<void> {
    if (pool) {
        await pool.end()
        console.log('[CronJob] 🛑 Postgres pool closed')
    }
}

// Auto-start when this module is imported
try {
    startCronJobs()
} catch (err) {
    console.error('[CronJob] 💥 Failed to start cron jobs:', err)
}

export default { startCronJobs, stopCronJobs }
