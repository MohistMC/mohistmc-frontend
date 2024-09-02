import { PartialLocaleState } from '@/features/i18n/TranslatorSlice'

const zhTranslation: PartialLocaleState = {
    name: '简体中文',
    initials: 'zh',
    strings: {
        'index.page.title': 'MohistMC - 主页',
        'index.head.title': '体验由社区驱动的Minecraft软件的力量。',
        'index.head.subtitle':
            'MohistMC 致力于通过创建独特的混合 Minecraft 软件来突破界限，实现不可能。此外，我们努力维护和增强一些模组和插件，旨在为玩家提供卓越的游戏体验。',
        'index.cards.title': '将您的服务器带到 %下一个级别%',
        'index.cards.mohist.description':
            '一个强大的Mohist Forge混合服务器软件，实现了Bukkit、Spigot API。',
        'index.cards.banner.description':
            '一个强大的Mohist Fabric混合服务器软件，实现了Bukkit、Spigot API。',
        'index.cards.youer.description':
            '一个强大的Mohist NeoForge混合服务器软件，实现了Bukkit、Spigot API。',
        'index.cards.website.description':
            '我们的网站允许任何用户发现我们的软件并轻松免费下载它们!',
        'index.cards.other.description':
            '您不想询问上述3个软件中的任何一个吗？没问题，点击这里.',
        'index.stats.title': 'MohistMC的统计数据',
        'index.stats.resolvedbugs': '已解决的错误',
        'index.stats.openedissues': '已开启的问题',
        'index.stats.players': '玩家',
        'index.stats.servers': '服务器',
        'index.partner.title': 'A %special thanks% to',
        'button.downloads': '下载',
        'button.download': '下载',
        'button.discord': 'Discord',
        'button.github': 'GitHub',
        'button.sponsor': '赞助',
        'button.api': 'API',
        'button.software': '软件',
        'button.learnmore': '了解更多',
        'button.readmore': '阅读更多',
        'button.documentation': '文档',
        'button.documentations': '文档',
        'button.about': '关于我们',
        'button.team': '我们的团队',
        'button.community': '我们的社区',
        'button.download.mirror': '镜像下载',
        'button.sourcecode': '源代码',
        'button.blog': '博客',
        'button.close': '关闭',
        'button.contribute': '贡献',
        'button.shop': '小卖铺',
        'button.subscription': '订阅',
        'footer.heading.gettingstarted': '入门指南',
        'footer.heading.discover': '发现我们',
        'footer.heading.community': '社区',
        'social.github': 'GitHub',
        'social.discord': 'Discord',
        'social.forum': '论坛',
        'social.opencollective': 'OpenCollective',
        'social.ghsponsors': 'GitHub 赞助商',
        'social.alipay': '支付宝',
        'downloads.page.title': 'MohistMC - 下载',
        'downloads.title': '免费下载我们的任何软件！',
        'downloads.mohist.desc':
            '一个实现了Bukkit、Spigot API的Minecraft Forge服务器软件。使用此软件，您可以创建一个带有模组和插件的Minecraft服务器！',
        'downloads.banner.desc':
            '一个实现了Bukkit和Spigot API的Minecraft Fabric服务器软件。这个软件允许您创建一个使用Fabric模组和插件的Minecraft服务器，就像Mohist一样，但是适用于Fabric。',
        'downloads.your.desc':
            '一个实现了Bukkit和Spigot API的Minecraft NeoForge服务器软件。这个软件允许您创建一个使用NeoForge模组和插件的Minecraft服务器，就像Mohist一样，但是适用于NeoForge。',
        'downloads.endtext': '目前就这些了',
        'downloadSoftware.page.title': 'MohistMC - 下载 {}',
        'downloadSoftware.title': '下载% %',
        'downloadSoftware.mohist.desc':
            '下载 Mohist，我们的 Minecraft 混合 Forge + Bukkit/Spigot 服务器软件。',
        'downloadSoftware.banner.desc':
            '下载 Banner，我们的 Minecraft 混合 Fabric + Bukkit/Spigot 服务器软件。',
        'downloadSoftware.search.placeholder': '搜索版本...',
        'downloadSoftware.search.noresults': '未找到结果。',
        'downloadSoftware.search.nobuilds': '未找到版本。',
        'downloadSoftware.search.filter.btn': '筛选',
        'downloadSoftware.search.exactMatch': '精确匹配',
        'downloadSoftware.build.number': '构建编号',
        'downloadSoftware.build.name': '构建名称',
        'downloadSoftware.build.md5': 'MD5 校验和',
        'downloadSoftware.build.date': '构建日期',
        'downloadSoftware.build.forgever': 'Forge/NeoForge 版本',
        'downloadSoftware.build.fabricver': 'Fabric loader 版本',
        'downloadSoftware.seemore': '查看更多',
        'downloadSoftware.mohist.1.7.10.toast':
            'Mohist 1.7.10已停止维护，不建议使用。我们不提供对Mohist 1.7.10的支持。您可以使用CrucibleMC作为替代。',
        'downloadSoftware.mohist.1.18.2.toast':
            'Mohist 1.18.2目前处于开发阶段，可能存在错误。',
        'downloadSoftware.mohist.1.19.2.toast':
            'Mohist 1.19.2正在缓慢开发中，可能存在错误。',
        'downloadSoftware.mohist.1.19.4.toast':
            'Mohist 1.19.4已停止维护，不建议使用。',
        'downloadSoftware.mohist.1.20.toast':
            'Mohist 1.20已停止维护，请使用Mohist 1.20.1以获取更新。',
        'sponsor.page.title': 'MohistMC - 赞助',
        'sponsor.title': '支持MohistMC的Minecraft创新未来',
        'sponsor.subtitle':
            '帮助推动MohistMC社区的发展。您的支持将覆盖必要的费用，包括服务、服务器和基础设施。立即贡献，改变MohistMC的未来。',
        'sponsor.section.title': '我们的赞助商',
        'sponsor.section.subtitle': '他们相信我们的项目！',
        'mohistapi.page.title': 'MohistMC - JSON API',
        'mohistapi.title': 'MohistMC的JSON API',
        'mohistapi.subtitle':
            'MohistMC为开发人员提供了一个JSON API，用于获取有关MohistMC项目和构建的信息。',
        'team.page.title': 'MohistMC - 我们的团队',
        'team.title': 'MohistMC%成员%',
        'team.community.title': '社区贡献者',
        'software.mohist.page.title': 'MohistMC - Mohist',
        'software.mohist.subtitle':
            'Mohist是一个出色的Minecraft Forge服务器软件，实现了Bukkit、Spigot API。通过利用这个强大的组合，您可以创建一个高性能的Minecraft服务器，能够集成模组和插件，确保稳定性和最佳性能。',
        'software.mohist.cards.title': 'Mohist有什么特别之处？',
        'software.mohist.cards.1.title': '增强性能',
        'software.mohist.cards.1.desc':
            '通过集成Bukkit和Spigot以支持插件和提高性能，即使有大量的模组和插件，也能享受流畅无缝的游戏体验。',
        'software.mohist.cards.2.title': '兼容性',
        'software.mohist.cards.2.desc':
            '通过Mohist与Bukkit、Spigot API的集成，解锁无限可能性的模组和插件兼容性。轻松定制您的服务器。',
        'software.mohist.cards.3.title': '社区支持和定期更新',
        'software.mohist.cards.3.desc':
            '加入Mohist社区获取支持和定期更新！保持与最新的Minecraft版本同步，并获得新功能和改进。',
        'software.mohist.footer.title': '准备提升您的Minecraft服务器体验吗？',
        'software.mohist.footer.desc':
            '通过模组和插件的集成，以及优化的性能，体验无与伦比的稳定性。加入Mohist社区，为您的服务器解锁无限可能性。立即升级到Mohist，革新您的Minecraft体验。',
        'software.mohist.footer.discord': '加入我们的Discord',
        'software.mohist.footer.shop': '前往我们的商城',
        '404.title': '未找到',
        '404.subtitle': '很抱歉，您所寻找的资源在本网站上找不到。',
        'docs.title': 'MohistMC的文档',
        'docs.subtitle':
            'MohistMC为我们的软件提供了各种文档。只需点击您要查找的软件！',
        'docs.cards.websiteapi.title': '网站API',
        'docs.cards.websiteapi.desc':
            'MohistMC为开发人员提供了一个JSON API，用于获取有关MohistMC项目和构建的信息。',
        'software.banner.page.title': 'MohistMC - banner',
        'software.banner.subtitle':
            'banner是一个独特的项目，无缝地结合了Fabric和Bukkit用于Minecraft。作为一个Fabric模组，它允许您创建一个功能丰富的Minecraft服务器，能够集成模组和插件，确保稳定性和增强的游戏体验。通过充分利用Fabric和Bukkit的优势，banner为服务器定制和游戏增强打开了无限的可能性。',
        'software.banner.cards.title': 'banner有什么特别之处？',
        'software.banner.cards.1.title': '易于使用',
        'software.banner.cards.1.desc':
            'banner易于使用和安装。只需下载banner的jar文件并将其放置在服务器的mods文件夹中。banner将自动为您创建一个插件文件夹，供您放置插件。',
        'software.banner.cards.2.title': '兼容性',
        'software.banner.cards.2.desc':
            '通过banner与Bukkit和Spigot API的集成，解锁无限可能性的模组和插件兼容性。使用banner轻松定制您的服务器。',
        'software.banner.cards.3.title': '社区支持和定期更新',
        'software.banner.cards.3.desc':
            '加入banner社区获取支持和定期更新！保持与最新的Minecraft版本同步，并获得新功能和改进。',
        'software.banner.footer.desc':
            '通过模组和插件的集成，体验无与伦比的稳定性。加入banner社区，为您的服务器解锁无限可能性。立即升级到banner，革新您的Minecraft体验。',
        'software.youer.page.title': 'MohistMC - Youer',
        'software.youer.title': 'Youer - 即将到来',
        'software.youer.subtitle':
            'Youer是一个出色的NeoForge服务器软件，实现了Bukkit、Spigot API。通过利用这个强大的组合，您可以创建一个高性能的Minecraft服务器，能够集成模组和插件，确保稳定性和最佳性能。',
        'software.youer.cards.title': 'Youer有什么特别之处？',
        'software.youer.cards.1.title': '增强性能',
        'software.youer.cards.1.desc':
            '通过集成Bukkit和Spigot以支持插件和提高性能，即使有大量的模组和插件，也能享受流畅无缝的游戏体验。',
        'software.youer.cards.2.title': '兼容性',
        'software.youer.cards.2.desc':
            '通过Youer与Bukkit、Spigot API的集成，解锁无限可能性的模组和插件兼容性。轻松定制您的服务器。',
        'software.youer.cards.3.title': '社区支持和定期更新',
        'software.youer.cards.3.desc':
            '加入MohistMC社区获取支持和定期更新！保持与最新的Minecraft版本同步，并获得新功能和改进。',
        'software.youer.footer.title': '准备提升您的Minecraft服务器体验吗？',
        'software.youer.footer.desc':
            '通过模组和插件的集成，以及优化的性能，体验无与伦比的稳定性。加入MohistMC社区，为您的服务器解锁无限可能性。立即升级到Youer，革新您的Minecraft体验。',
        'toast.filters.enabled':
            '您仍然启用了过滤器，如果您看不到任何内容，可能需要将其移除。',
        'toast.logged.success': '您已成功登录。',
        'toast.logged.failed': '登录失败，可能是令牌错误。',
        'toast.logged.servererror': '无法加入服务器。请稍后再试。',
        'toast.logged.signout': '您已退出登录。',
        'loginmodal.title': '登录以报告问题',
        'loginmodal.subtitle':
            '为了确保您不是机器人并能够与您联系，请登录以报告问题。',
        'loginmodal.githublogin': '使用Github登录',
        'loginmodal.discordlogin': '使用Discord登录',
        'loginmodal.return': '返回主页',
        'loginmodal.logged.via': '登录方式: ',
        'issuemodal.title': '您想要报告我们软件中的问题吗？',
        'issuemodal.subtitle':
            '我们非常乐意帮助您解决任何问题。有两种报告问题的方式: ',
        'issuemodal.report.github': '通过GitHub报告',
        'issuemodal.report.website': '通过网站报告',
        'issuemodal.dropdown.item.website': '网站',
        'issuemodal.discord.text':
            '您也可以在Discord上与我们互动寻求帮助！但请注意，由于我们面临的高需求，大多数情况下仍需要提交问题报告。因此，Discord可能并不总是解决您的问题的最有效方式。',
        'contribute.page.title': 'MohistMC - 贡献',
        'contribute.title': '为%MohistMC%做出贡献，帮助我们改进软件！',
        'contribute.subtitle':
            'MohistMC制作开源项目，由社区贡献推动。您可以通过多种方式参与塑造这些项目。',
        'contribute.cards.finance.title': '财务贡献',
        'contribute.cards.finance.desc':
            'MohistMC是一个非营利组织。我们依靠捐款来资助我们的运营，继续开发我们的项目并维护我们的基础设施。您的贡献将帮助我们继续为社区提供服务。',
        'contribute.cards.github.title': '贡献代码',
        'contribute.cards.github.desc':
            'MohistMC制作开源项目！我们欢迎社区的贡献。您可以通过在GitHub上提交拉取请求或报告问题来为我们的项目做出贡献。',
        'contribute.cards.docs.title': '贡献文档',
        'contribute.cards.docs.desc':
            'MohistMC为我们的软件提供了各种文档，许多用户需要它们。您可以通过在GitHub上为文档做出贡献来帮助我们改进文档。',
        'contribute.cards.translation.title': '成为翻译者',
        'contribute.cards.translation.desc':
            '我们将我们的项目提供给多种语言，以便每个人都可以使用它们。如果您精通英语以外的其他语言，您可以帮助我们翻译我们的项目！',
        'contribute.cards.translation.button': 'Crowdin页面',
        'contribute.footer.title': '加入我们的社区，共同创建更好的项目！',
        'contribute.footer.desc':
            'MohistMC是一个社区驱动的组织。我们欢迎社区的贡献。加入我们的社区，帮助我们创建更好的项目！',
        'blog.title': '博客',
        'blog.subtitle': 'MohistMC 的最新更新和发布.',
        'blog.lastupdated': '最后编辑于',
        'report.issue.title': '问题反馈',
        'report.issue.desc':
            '想要报告问题、提出问题或提出建议/功能请求？你来对地方了.',
        'report.issue.manage': '管理已反馈的问题',
        'report.issue.product': '项目',
        'report.issue.type': '类型',
        'report.issue.type.bug': 'Bug',
        'report.issue.type.bug.desc':
            'You have bugs with one of our software? Click on this card.',
        'report.issue.type.feature': '功能 / 建议',
        'report.issue.type.feature.desc':
            'You want to make our software better? Click on this card.',
        'report.issue.type.question': 'Question',
        'report.issue.type.question.desc':
            'Any question about? Click on this card.',
        'report.issue.type.other': '其他',
        'report.issue.type.other.desc':
            "If you don't see what you want to do above, click on this card.",
        'report.issue.form.minecraftversions': '选择你的 Minecraft 版本',
        'report.issue.form.mohistversion': '不支持超出此范围的任何构建',
        'report.issue.form.operatingsystem': '操作系统',
        'report.issue.form.modplugin': '插件/模组列表',
        'report.issue.form.file': '上传日志文件或者屏幕截图',
        'report.issue.form.file.helper':
            'latest.log, crash-reports, screenshots, 或任何可以提供帮助的东西...',
        'report.issue.form.comment': '描述',
        'report.issue.form.comment.placeholder': '在这里描述您的问题...',
        'report.issue.form.submit': '提交',
        'time.format.mohth': '月',
        'vault.format.mohth': '￥',
        'subscription.page.title': 'MohistMC - 订阅',
        'subscription.title': '定价计划',
        'subscription.subtitle': '帐户计划可解锁其他功能',
        'subscription.items.free': '铲',
        'subscription.items.vip': '稿',
        'subscription.items.svip': '斧',
        'subscription.items.ssvip': '剑',
        'subscription.items.1': '自由下载和使用',
        'subscription.items.2': 'GitHub 反馈',
        'subscription.items.3': '完善的文档',
        'subscription.items.4': '优先处理反馈',
        'subscription.items.5': '技术支持与服务',
        'subscription.items.6': '一对一优先处理',
        'subscription.items.7': '偶尔收到周边赠品'
    },
}

export default zhTranslation
