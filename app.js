const puppeteer = require('puppeteer')
const brEnsPoint = process.argv[2]

const start = async () => {
    const browser = await puppeteer.connect( {browserWSEndpoint: brEnsPoint} )
    console.log('create browser');

    console.log('new page');
    const page = await browser.newPage()

    page.setViewport({
        width: 1366,
        height: 1080
    })

    // console.log('cross to dashboard');
    // await Promise.all([
    //     page.goto('https://coinlist.co/dashboard'),
    //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
    //     page.waitForNavigation({ timeout: 10000 }),
    // ]);

    

    

    console.log('cross to QREDO');
    await Promise.all([
        page.goto('https://coinlist.co/qredo'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    console.log('click REGISTER');
    await Promise.all([
        page.click('#cover_top_content > div > div > div.s-grid.s-marginTop4.s-grid--bottom.u-textAlignCenter > div.index-deal_page_index-header__cta_section.s-grid--bottom.s-grid-colMd8.u-textAlignLeft > div > a'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    console.log('click REGISTER NOW');
    await Promise.all([
        await page.click('#token-sale > div > div > div > div > div > div.s-grid.u-text-center.s-marginTop2 > div:nth-child(1) > div > div > a'),
        page.waitForTimeout(2000)
    ]); 
    
    console.log('cross to login');
    await Promise.all([
        page.click('#new_user > div > div.s-gridC-colSm24.u-text-center > a'),
        page.waitForTimeout(10000)
    ]); 

    console.log('input DATA');    
    await page.type('#user_email', 'plyushchev-danila@mail.ru')
    await page.type('#user_password', 'oR6ZrQ6MPfA')

    console.log('click LOGIN');
    await Promise.all([
        page.click('#new_user > div > div:nth-child(4) > input'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    ])

    console.log('click GET STARTED');
    await Promise.all([
        await page.click('body > div.s-container.s-gridMaxXs24.layouts-shared-offering_flow > div > div > div.s-grid-colSm16 > div > div > a'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]); 

    console.log('click CONTINUE WITH');
    await Promise.all([
        await page.click('body > div.s-container.s-gridMaxXs24.layouts-shared-offering_flow > div > div > div.s-grid-colSm16 > div > div > div.js-existing_entity > a'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]); 

    console.log('change SELECT')
    const selectElem = await page.$('#forms_offerings_participants_residence_residence_country')
    await selectElem.type('RU')
    await page.click('#new_forms_offerings_participants_residence > div:nth-child(7) > div > label')

    console.log('click CONTINUE');
    await Promise.all([
        page.click('#new_forms_offerings_participants_residence > div.s-marginTop2 > a'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    ])

    console.log('continue is finish');

}

start();