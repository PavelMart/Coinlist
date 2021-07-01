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
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    console.log('click REGISTER');
    await Promise.all([
        page.click('#cover_top_content > div > div > div.s-grid.s-marginTop4.s-grid--bottom.u-textAlignCenter > div.index-deal_page_index-header__cta_section.s-grid--bottom.s-grid-colMd8.u-textAlignLeft > div > a'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    console.log('click REGISTER NOW');
    await Promise.all([
        await page.click('#token-sale > div > div > div > div > div > div.s-grid.u-text-center.s-marginTop2 > div:nth-child(1) > div > div > a'),
        page.waitForTimeout(5000)
        // page.waitForNavigation({ waitUntil: 'networkidle0' }),
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
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    console.log('cross to MAIL.RU');
    await Promise.all([
        page.goto('https://mail.ru/'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    console.log('input EMAIL');
    await page.type('#mailbox > form.body.svelte-1eyrl7y > div.email-container.svelte-1eyrl7y > div.email-input-container.svelte-1eyrl7y > input', 'plyushchev-danila@mail.ru');

    console.log('click NEXT');
    await Promise.all([
        page.click('#mailbox > form.body.svelte-1eyrl7y > button.button.svelte-1eyrl7y'),
        page.waitForTimeout(5000)
    ]);

    console.log('input PASSWORD');
    await page.type('#mailbox > form.body.svelte-1eyrl7y > div.password-input-container.svelte-1eyrl7y > input', 'oR6ZrQ6MPfA');

    console.log('click LOGIN');
    await Promise.all([
        page.click('#mailbox > form.body.svelte-1eyrl7y > button.second-button.svelte-1eyrl7y'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.waitForTimeout(10000)
    ]);

    console.log('click NEWSLETTERS');
    await Promise.all([
        page.click('#app-canvas > div > div.application-mail > div.application-mail__overlay > div > div.application-mail__layout.application-mail__layout_main > span > div.layout__main-frame > div > div > div > div > div.letter-list.letter-list_has-letters > div > div > div.dataset-letters > div > div > div > div.metathread.metathread_collapsed > div.metathread__contain > a'),
        page.waitForTimeout(3000)
    ]);

    console.log('click on FIRST LETTER');
    await Promise.all([
        page.click('#app-canvas > div > div.application-mail > div.application-mail__overlay > div > div.application-mail__layout.application-mail__layout_main > span > div.layout__main-frame > div > div > div > div > div.letter-list.letter-list_has-letters > div > div > div.dataset-letters > div > div > div > a:nth-child(5) > div.llc__container > div'),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);

    console.log('click for ACCEPT DEVICE');
    await Promise.all([
        page.click('#body-wrapper_mr_css_attr > tbody > tr > td > div > table:nth-child(2) > tbody > tr > td > div.layouts-coinlist_mailer-application__content_mr_css_attr.layouts-coinlist_mailer-application__content--normal_mr_css_attr > div > div.s-paddingTop1_mr_css_attr.u-text-center_mr_css_attr.s-paddingBottom2_mr_css_attr > a'),
        page.waitForTimeout(15000)
    ]);

    // console.log('click GET STARTED');
    // await Promise.all([
    //     await page.click('body > div.s-container.s-gridMaxXs24.layouts-shared-offering_flow > div > div > div.s-grid-colSm16 > div > div > a'),
    //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
    // ]); 

    // console.log('click CONTINUE WITH');
    // await Promise.all([
    //     await page.click('body > div.s-container.s-gridMaxXs24.layouts-shared-offering_flow > div > div > div.s-grid-colSm16 > div > div > div.js-existing_entity > a'),
    //     page.waitForNavigation({ waitUntil: 'networkidle0' }),
    // ]); 

    // console.log('change SELECT');

    // const selectElem = await page.$('#forms_offerings_participants_residence_residence_country')
    // console.log('selectElem: ', selectElem);

    // await selectElem.type('RU')

}

start();