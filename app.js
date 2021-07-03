const puppeteer = require('puppeteer')
const brEnsPoint = process.argv[2]

const answers = [
    'It is its own layer 2 blockchain',
    'Option 1: 30,000; Option 2: 2,250',
    'Users in the waiting room will be given a random spot in the queue when the sale starts. Users who arrive after the sale starts will be placed behind those in the waiting room',
    'Option 1: Tokens unlock on or around September 8, 2021. Option 2: Tokens release linearly over 12 months starting from January 8, 2022',
    'BTC, ETH, USDC, USDT',
    'Option 1: $0.50 per token, $500 limit. Option 2: $0.225 per token, $1,000 limit',
    'The user\'s purchase may be cancelled and the user may be banned from future CoinList sales',
    'CoinList.co',
    'coinlistofficialchannel',
    'The user\'s account will be terminated and all purchases will be cancelled'
]

const checkAdress = async (page, adress) => {
    return await page.evaluate(async (adress) => {
        if (document.location.href.match(adress)) {
            return true
        } else {
            return false
        }
    }, adress)
}

const checkPage = async (page, adress, selector, log) => {
    if (await checkAdress(page, adress) === true) {
        console.log(log) 
        await Promise.all([
            page.click(selector),
            page.waitForNavigation({ waitUntil: 'domcontentloaded' })
        ])
    } 
}

const checkSelectPage = async (page, adress) => {
    if (await checkAdress(page, adress) === true) {
        console.log('change SELECT')
        const selectElem = await page.$('#forms_offerings_participants_residence_residence_country')
        await selectElem.type('RU')
        await page.click('#new_forms_offerings_participants_residence > div:nth-child(7) > div > label')

        console.log('click CONTINUE') 
        await Promise.all([
            page.click('#new_forms_offerings_participants_residence > div.s-marginTop2 > a'),
            page.waitForNavigation({ waitUntil: 'domcontentloaded' })
        ])
    }
}

const start = async () => {
    console.log('create browser')
    const browser = await puppeteer.connect( {browserWSEndpoint: brEnsPoint} )

    console.log('new page') 
    const page = await browser.newPage()

    page.setViewport({
        width: 1366,
        height: 1080
    })

    console.log('cross to QREDO') 
    await Promise.all([
        page.goto('https://coinlist.co/qredo'),
        page.waitForTimeout(10000)
    ]) 

    console.log('click REGISTER') 
    await Promise.all([
        page.click('#cover_top_content > div > div > div.s-grid.s-marginTop4.s-grid--bottom.u-textAlignCenter > div.index-deal_page_index-header__cta_section.s-grid--bottom.s-grid-colMd8.u-textAlignLeft > div > a'),
        page.waitForTimeout(1000)
    ]) 

    console.log('click REGISTER NOW') 
    await Promise.all([
        await page.click('#token-sale > div > div > div > div > div > div.s-grid.u-text-center.s-marginTop2 > div:nth-child(1) > div > div > a'),
        page.waitForTimeout(1000)
    ])  
    
    console.log('cross to login')
    console.log('Waiting for 10s...'); 
    await Promise.all([
        page.click('#new_user > div > div.s-gridC-colSm24.u-text-center > a'),
        page.waitForTimeout(10000)
    ])  

    console.log('click LOGIN') 
    await Promise.all([
        page.click('#new_user > div > div:nth-child(4) > input'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    ])

    console.log(`
    ****************************
    PLEASE INPUT CODE DURING 15s
    ****************************
    `);

    console.log('Waiting for 15s...');
    await page.waitForTimeout(15000)

    await checkPage(
        page, 
        'onboarding', 
        'body > div.s-container.s-gridMaxXs24.layouts-shared-offering_flow > div > div > div.s-grid-colSm16 > div > div > a',
        'click GET STARTED'
    )

    await checkPage(
        page, 
        'new', 
        'body > div.s-container.s-gridMaxXs24.layouts-shared-offering_flow > div > div > div.s-grid-colSm16 > div > div > div.js-existing_entity > a',
        'click CONTINUE WITH'
    )

    await checkSelectPage(
        page, 
        'residence'
    )

    console.log('select ANSWERS');
    await page.evaluate((answers) => {
        const fields = document.querySelectorAll('.c-label.c-label--inline.s-marginLeft1');

        answers.forEach( answer => {
            [...fields].find( field => field.innerText === answer).click();
        });

    }, answers) 

    // console.log('click FINISH') 
    // await Promise.all([
    //     page.click('body > div.s-container.s-gridMaxXs24.layouts-shared-offering_flow > div > div > div.s-grid-colSm16 > div > div > div.offerings-participants-quiz-form > form > div.s-marginTop2 > a'),
    //     page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    // ])

    
}

start() 