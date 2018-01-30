/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : shuiyan

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-30 15:49:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sy_admin
-- ----------------------------
DROP TABLE IF EXISTS `sy_admin`;
CREATE TABLE `sy_admin` (
  `admin_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `admin_name` varchar(255) NOT NULL DEFAULT '' COMMENT '管理员账号',
  `admin_pass` char(50) NOT NULL DEFAULT '' COMMENT '管理员密码',
  `admin_email` varchar(255) NOT NULL DEFAULT '' COMMENT '管理员电子邮箱',
  `login_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '登陆IP',
  `role_id` int(10) NOT NULL COMMENT '角色ID关联role',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `login_time` datetime DEFAULT NULL COMMENT '登陆时间',
  `label` varchar(10) DEFAULT NULL COMMENT '标记 super为超级管理员',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `shop_admin_adminuser_adminpass` (`admin_name`,`admin_pass`),
  UNIQUE KEY `shop_admin_adminuser_adminemail` (`admin_name`,`admin_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_admin
-- ----------------------------
INSERT INTO `sy_admin` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '971976839@qq.com', '0', '1', '2018-01-25 17:00:30', null, 'super');
INSERT INTO `sy_admin` VALUES ('2', 'user', 'e10adc3949ba59abbe56e057f20f883e', '214340687@qq.com', '0', '2', '2018-01-26 17:00:21', null, null);
INSERT INTO `sy_admin` VALUES ('3', 'laojiu', 'e10adc3949ba59abbe56e057f20f883e', '425507004@qq.com', '0', '2', '2018-01-27 14:59:04', null, null);

-- ----------------------------
-- Table structure for sy_authority
-- ----------------------------
DROP TABLE IF EXISTS `sy_authority`;
CREATE TABLE `sy_authority` (
  `auth_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `auth_name` varchar(50) NOT NULL COMMENT '权限名称',
  `menu_id` int(11) DEFAULT NULL,
  `action` varchar(11) DEFAULT NULL COMMENT '操作方法（删除，添加，查看等）',
  `controller` varchar(11) DEFAULT NULL COMMENT '控制器模块',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级的id',
  `module` varchar(255) DEFAULT NULL COMMENT '模块',
  PRIMARY KEY (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_authority
-- ----------------------------
INSERT INTO `sy_authority` VALUES ('1', '用户管理', '7', null, null, '-1', 'admin');
INSERT INTO `sy_authority` VALUES ('2', '前台用户管理', '1', null, null, '7', 'admin');
INSERT INTO `sy_authority` VALUES ('3', '后台用户管理', '2', 'index', 'admin_user', '7', 'admin');
INSERT INTO `sy_authority` VALUES ('4', '添加编辑后台用户', null, 'add', 'admin_user', '2', 'admin');
INSERT INTO `sy_authority` VALUES ('5', '删除后台用户', null, 'delete', 'admin_user', '2', 'admin');
INSERT INTO `sy_authority` VALUES ('6', '角色权限管理', '8', null, null, '-1', 'admin');
INSERT INTO `sy_authority` VALUES ('7', '角色管理', '4', 'index', 'role', '8', 'admin');
INSERT INTO `sy_authority` VALUES ('8', '添加编辑角色', null, 'add', 'role', '4', 'admin');
INSERT INTO `sy_authority` VALUES ('9', '角色成员', null, 'viewMember', 'role', '4', 'admin');
INSERT INTO `sy_authority` VALUES ('10', '分配角色', null, null, 'role', '4', 'admin');
INSERT INTO `sy_authority` VALUES ('11', '禁用角色', null, 'doenable', 'role', '4', 'admin');
INSERT INTO `sy_authority` VALUES ('12', '删除角色', null, 'delete', 'role', '4', 'admin');
INSERT INTO `sy_authority` VALUES ('13', '菜单管理', '9', null, null, '-1', 'admin');
INSERT INTO `sy_authority` VALUES ('14', '菜单列表', '6', null, null, '9', 'admin');
INSERT INTO `sy_authority` VALUES ('15', '添加菜单', '5', null, null, '9', 'admin');
INSERT INTO `sy_authority` VALUES ('16', '内容管理', '22', null, null, '-1', 'admin');
INSERT INTO `sy_authority` VALUES ('17', '通知公告', '10', 'index', 'notice', '22', 'admin');
INSERT INTO `sy_authority` VALUES ('18', '发布编辑公告', null, 'add', 'notice', '10', 'admin');
INSERT INTO `sy_authority` VALUES ('19', '删除公告', null, 'delete', 'notice', '10', 'admin');
INSERT INTO `sy_authority` VALUES ('20', '水研新闻', '15', 'index', 'news', '22', 'admin');
INSERT INTO `sy_authority` VALUES ('21', '发布编辑新闻', null, 'add', 'news', '15', 'admin');
INSERT INTO `sy_authority` VALUES ('22', '删除新闻', null, 'delete', 'news', '15', 'admin');
INSERT INTO `sy_authority` VALUES ('23', '新闻分类', '19', 'index', 'news_sort', '22', 'admin');
INSERT INTO `sy_authority` VALUES ('24', '添加编辑分类', null, 'add', 'news_sort', '19', 'admin');
INSERT INTO `sy_authority` VALUES ('25', '删除分类', null, 'delete', 'news_sort', '19', 'admin');
INSERT INTO `sy_authority` VALUES ('26', '图库管理', '20', 'index', 'slideshow', '22', 'admin');
INSERT INTO `sy_authority` VALUES ('27', '添加编辑图片', null, 'add', 'slideshow', '20', 'admin');
INSERT INTO `sy_authority` VALUES ('28', '设置轮播图', null, 'setslide', 'slideshow', '20', 'admin');
INSERT INTO `sy_authority` VALUES ('29', '删除图片', null, 'delete', 'slideshow', '20', 'admin');
INSERT INTO `sy_authority` VALUES ('30', '水研介绍', '21', 'add', 'introduce', '22', 'admin');
INSERT INTO `sy_authority` VALUES ('31', '提交介绍', null, 'doadd', 'introduce', '21', 'admin');
INSERT INTO `sy_authority` VALUES ('32', '联系我们', '23', 'index', 'contact', '22', 'admin');
INSERT INTO `sy_authority` VALUES ('33', '友情链接', '24', 'index', 'friendlink', '22', 'admin');
INSERT INTO `sy_authority` VALUES ('34', '添加编辑', null, 'add', 'friendlink', '24', 'admin');
INSERT INTO `sy_authority` VALUES ('35', '删除', null, 'delete', 'friendlink', '24', 'admin');
INSERT INTO `sy_authority` VALUES ('36', '系统设置', '16', null, null, '-1', 'admin');

-- ----------------------------
-- Table structure for sy_contact
-- ----------------------------
DROP TABLE IF EXISTS `sy_contact`;
CREATE TABLE `sy_contact` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_email` varchar(25) DEFAULT NULL COMMENT '邮箱',
  `contact_name` varchar(25) DEFAULT NULL COMMENT '姓名',
  `contact_content` varchar(255) DEFAULT NULL COMMENT '反馈内容',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_contact
-- ----------------------------
INSERT INTO `sy_contact` VALUES ('1', '971976839@qq.com', '事实上', '合法规范合格', '2018-01-16 14:23:13');
INSERT INTO `sy_contact` VALUES ('10', '971976839@qq.com', 'lhy', '多福多寿订单', '2018-01-16 14:34:09');
INSERT INTO `sy_contact` VALUES ('11', '971976839@qq.com', '试试', '辅导费', '2018-01-16 14:37:09');
INSERT INTO `sy_contact` VALUES ('12', '971976839@qq.com', '啊啊', '舒服舒服', '2018-01-16 14:38:17');
INSERT INTO `sy_contact` VALUES ('13', '971976839@qq.com', '是的吧', '是否发放对方答复', '2018-01-16 14:41:45');
INSERT INTO `sy_contact` VALUES ('14', '971976839@qq.com', '这是一条测试吧', '我要反馈一些内容，希望你们能及时处理', '2018-01-16 15:14:02');
INSERT INTO `sy_contact` VALUES ('15', '971976839@qq.com', 'lhy', '发送到丰富的', '2018-01-16 15:22:27');

-- ----------------------------
-- Table structure for sy_friendlink
-- ----------------------------
DROP TABLE IF EXISTS `sy_friendlink`;
CREATE TABLE `sy_friendlink` (
  `friendlink_id` int(11) NOT NULL AUTO_INCREMENT,
  `friendlink_name` varchar(25) DEFAULT '' COMMENT '链接名称',
  `friendlink_url` varchar(55) DEFAULT '' COMMENT '链接地址',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`friendlink_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_friendlink
-- ----------------------------
INSERT INTO `sy_friendlink` VALUES ('1', '百度搜索', 'http://baidu.com', '2018-01-18 10:33:40');
INSERT INTO `sy_friendlink` VALUES ('2', '淘宝', 'http://taobao.com', '2018-01-18 10:39:46');

-- ----------------------------
-- Table structure for sy_introduce
-- ----------------------------
DROP TABLE IF EXISTS `sy_introduce`;
CREATE TABLE `sy_introduce` (
  `introduce_id` int(11) NOT NULL AUTO_INCREMENT,
  `introduce_simple` varchar(500) DEFAULT NULL COMMENT '水研简介',
  `introduce_all` longtext COMMENT '介绍详情',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`introduce_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_introduce
-- ----------------------------
INSERT INTO `sy_introduce` VALUES ('1', '水研村坐落在美丽的广西壮族自治区北海市合浦县山口镇东部，北部与玉林市的大路塘、屋子岭相邻；\n距离镇中心约六公里，全新水泥路直通村里，交通方便；\n水研村风景优美，环境舒适，东南部有大排水库，水质清澈；西南部有建于1976年的“天桥”，该桥是当时用于灌溉的水渠的一部分，奇特的地方在于该“天桥”建在两座山之间，高度约有50米，长度大约700米，底下是一条清澈的那交河，至今屹立不倒。', '<p style=\"white-space: normal;\">&nbsp; &nbsp; &nbsp; &nbsp;水研村坐落在美丽的广西壮族自治区北海市合浦县山口镇东部，北部与玉林市的大路塘、屋子岭相邻； &nbsp; &nbsp;距离镇中心约六公里，全新水泥路直通村里，交通方便；</p><p style=\"white-space: normal;\">&nbsp; &nbsp; &nbsp; &nbsp;水研村风景优美，环境舒适，东南部有大排水库，水质清澈；西南部有建于1976年的“天桥”，该桥是当时用于灌溉的水渠的一部分，奇特的地方在于该“天桥”建在两座山之间，高度约有50米，长度大约700米，底下是一条清澈的那交河，至今屹立不倒。</p><p style=\"white-space: normal;\"><img src=\"https://shuiyanweb.herokuapp.com/static/upload/20180111/upload_1e8dd3973ce2b2584acf17bd183e52a9.jpg\" title=\"upload_1e8dd3973ce2b2584acf17bd183e52a9.jpg\" alt=\"11.11移动端.jpg\"/></p><h4 style=\"white-space: normal;\">水研名字的由来</h4><p style=\"white-space: normal;\">&nbsp; &nbsp; &nbsp; &nbsp;有两个叫法，一叫“水碾”，是因为村里在流经的小河旁建造了一个水碾，据说是利用河水的冲力来碾米等加工粮食的，具体的时间已无从考究，所以后来就叫“水碾村”；但是登记上报到国家收录村庄的时候，用了简写，于是用了“水研”，也就是官方的名字是“水研”。</p><p><br/></p>', '2018-01-11 15:54:56');

-- ----------------------------
-- Table structure for sy_menu
-- ----------------------------
DROP TABLE IF EXISTS `sy_menu`;
CREATE TABLE `sy_menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(50) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `menu_url` varchar(255) NOT NULL DEFAULT '' COMMENT '菜单控制器地址',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `parent_menu` int(11) NOT NULL DEFAULT '-1' COMMENT '一级菜单的parentmenu为-1，其他值则表示子菜单此时parentmenu的值就是菜单表的主键',
  `icon_class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_menu
-- ----------------------------
INSERT INTO `sy_menu` VALUES ('1', '前台用户管理', '', null, '7', 'fa fa-file');
INSERT INTO `sy_menu` VALUES ('2', '后台用户管理', '/admin_user/index?menu_id=2', null, '7', 'fa fa-fire');
INSERT INTO `sy_menu` VALUES ('3', '权限管理', '/auth/index?menu_id=3', null, '8', 'fa fa-flag');
INSERT INTO `sy_menu` VALUES ('4', '角色管理', '/role/index?menu_id=4', null, '8', 'fa fa-gavel');
INSERT INTO `sy_menu` VALUES ('5', '添加菜单', '', null, '9', 'fa fa-group');
INSERT INTO `sy_menu` VALUES ('6', '菜单列表', '', null, '9', 'fa fa-feed');
INSERT INTO `sy_menu` VALUES ('7', '用户管理', '', null, '-1', 'fa fa-gift');
INSERT INTO `sy_menu` VALUES ('8', '角色权限管理', '', null, '-1', 'fa fa-glass');
INSERT INTO `sy_menu` VALUES ('9', '菜单管理', '', null, '-1', 'fa fa-sort');
INSERT INTO `sy_menu` VALUES ('10', '通知公告', '/notice/index?menu_id=10', null, '22', 'fa fa-map');
INSERT INTO `sy_menu` VALUES ('15', '水研新闻', '/news/index?menu_id=15', null, '22', 'fa fa-taxi');
INSERT INTO `sy_menu` VALUES ('16', '系统设置', '', null, '-1', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('19', '新闻分类', '/news_sort/index?menu_id=19', null, '22', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('20', '图库管理', '/slideshow/index?menu_id=20', null, '22', 'fa fa-photo');
INSERT INTO `sy_menu` VALUES ('21', '水研介绍', '/introduce/add?menu_id=21', null, '22', 'fa fa-photo');
INSERT INTO `sy_menu` VALUES ('22', '内容管理', '', null, '-1', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('23', '联系我们', '/contact/index?menu_id=23', null, '22', 'fa fa-taxi');
INSERT INTO `sy_menu` VALUES ('24', '友情链接', '/friendlink/index?menu_id=24', null, '22', 'fa fa-taxi');

-- ----------------------------
-- Table structure for sy_news
-- ----------------------------
DROP TABLE IF EXISTS `sy_news`;
CREATE TABLE `sy_news` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `sort_id` int(11) NOT NULL COMMENT '所属栏目id',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `sub_title` varchar(255) DEFAULT NULL COMMENT '副标题',
  `intro` varchar(500) DEFAULT NULL COMMENT '简介',
  `content` longtext COMMENT '文章内容',
  `author` varchar(20) DEFAULT NULL COMMENT '作者',
  `copyfrom` varchar(20) DEFAULT NULL COMMENT '来源',
  `hits` int(11) DEFAULT NULL COMMENT '点击数',
  `post_num` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '生成时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `thumb` varchar(200) DEFAULT NULL COMMENT '缩略图地址',
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_news
-- ----------------------------
INSERT INTO `sy_news` VALUES ('2', '2', '论水研张林的才华', '', '', '<p>从前有座山。。。。。</p>', '', '', null, null, '2017-11-21 17:23:07', null, null);
INSERT INTO `sy_news` VALUES ('3', '1', '通告1', '', '', '<p>通告1</p>', '', '', null, null, '2017-11-21 17:50:06', null, null);
INSERT INTO `sy_news` VALUES ('4', '1', '通告2', '', '', '<p>通告2</p>', '', '', null, null, '2017-11-21 17:50:14', null, null);
INSERT INTO `sy_news` VALUES ('5', '1', '通告3', '', '', '<p>通告3</p>', '', '', null, null, '2017-11-21 17:50:20', null, null);
INSERT INTO `sy_news` VALUES ('6', '1', '通告4', '', '', '<p>通告4</p>', '', '', null, null, '2017-11-21 17:50:26', null, null);
INSERT INTO `sy_news` VALUES ('7', '1', '通告5', '', '', '<p>通告5</p>', '', '', null, null, '2017-11-21 17:50:32', null, null);
INSERT INTO `sy_news` VALUES ('8', '1', '通告6', '', '', '<p>通告6</p>', '', '', null, null, '2017-11-21 17:50:40', null, null);
INSERT INTO `sy_news` VALUES ('9', '1', '新闻1', '', '新闻1简介', '<p>新闻1</p>', '', '', null, null, '2017-11-21 17:50:49', '2018-01-12 16:31:22', '');
INSERT INTO `sy_news` VALUES ('11', '1', '新闻3', '', '恩 简介  是的', '<p>新闻3</p>', '', '', null, null, '2017-11-21 17:51:03', '2018-01-12 16:31:10', '');
INSERT INTO `sy_news` VALUES ('12', '2', '这是最新的一条了', '暂无', '暂无', '<p>这是新闻的主题内容，今天我本来想试试抢票的，结果抢到了，，，，，又得请多一天假，，还收了40块手续费</p>', '羽歌', '管理员', null, null, '2018-01-12 15:36:30', null, '');
INSERT INTO `sy_news` VALUES ('13', '1', '测试', '测试', '测试', '<p>这仅仅是测试</p>', '羽歌', '网络', null, null, '2018-01-24 15:21:57', '2018-01-24 15:31:15', 'news_20180124_upload_db6f0f2d6208a11a7a7903f3f37a29b3.png');

-- ----------------------------
-- Table structure for sy_news_sort
-- ----------------------------
DROP TABLE IF EXISTS `sy_news_sort`;
CREATE TABLE `sy_news_sort` (
  `sort_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `sort_name` varchar(20) DEFAULT NULL COMMENT '分类名称',
  `create_user` varchar(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`sort_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_news_sort
-- ----------------------------
INSERT INTO `sy_news_sort` VALUES ('1', '通知公告3', 'admin', '2017-11-20 11:34:50');
INSERT INTO `sy_news_sort` VALUES ('2', '今日新闻2', 'admin', '2017-11-20 11:34:33');
INSERT INTO `sy_news_sort` VALUES ('3', '水研快报', 'admin', '2017-11-20 11:43:50');
INSERT INTO `sy_news_sort` VALUES ('4', '测试分类', 'admin', '2017-11-20 14:28:22');
INSERT INTO `sy_news_sort` VALUES ('5', '测试分类2', 'admin', '2017-11-20 14:29:13');
INSERT INTO `sy_news_sort` VALUES ('9', '测试分类5', 'admin', '2017-11-20 17:47:36');
INSERT INTO `sy_news_sort` VALUES ('10', '测试分类4', 'admin', '2017-11-21 11:04:18');
INSERT INTO `sy_news_sort` VALUES ('11', '测试分类22', 'admin', '2017-11-21 11:06:10');

-- ----------------------------
-- Table structure for sy_notice
-- ----------------------------
DROP TABLE IF EXISTS `sy_notice`;
CREATE TABLE `sy_notice` (
  `notice_id` int(11) NOT NULL AUTO_INCREMENT,
  `notice_title` varchar(50) DEFAULT NULL COMMENT '公告标题',
  `notice_content` varchar(255) DEFAULT NULL COMMENT '公告内容',
  `notice_author` varchar(50) DEFAULT NULL COMMENT '发布人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_notice
-- ----------------------------
INSERT INTO `sy_notice` VALUES ('19', '数据库设计师', '大富大贵', '是的是的', '2018-01-19 10:42:08');
INSERT INTO `sy_notice` VALUES ('20', '风动旛动', '反反复复', '发的方法', '2018-01-19 10:42:16');
INSERT INTO `sy_notice` VALUES ('22', '新增公告', '附近的房间打开', '羽歌', '2018-01-19 10:54:18');
INSERT INTO `sy_notice` VALUES ('23', '红色记忆', '来一首吧  socket好了', 'admin', '2018-01-19 10:56:36');
INSERT INTO `sy_notice` VALUES ('24', '不知天高地厚', '来来来聪明的小孩', 'admin', '2018-01-19 10:57:03');
INSERT INTO `sy_notice` VALUES ('25', '爱你一万年', '爱你永不变', '羽歌', '2018-01-19 10:57:32');
INSERT INTO `sy_notice` VALUES ('26', '历史文化悠久', '水研欢迎您的到来', '历史古城', '2018-01-19 10:58:00');
INSERT INTO `sy_notice` VALUES ('27', '必须要再发一些公告', '嗯 哈德上党课', '要重新调整一些东西', '2018-01-19 10:58:37');
INSERT INTO `sy_notice` VALUES ('28', '法国红酒', '大幅度发放', '士大夫', '2018-01-19 11:01:30');
INSERT INTO `sy_notice` VALUES ('29', '丰富的非', '对方身份', '就好好几句话', '2018-01-19 11:01:40');
INSERT INTO `sy_notice` VALUES ('30', '梵蒂冈哼哼唧唧', '大幅度', '地方', '2018-01-23 15:12:47');
INSERT INTO `sy_notice` VALUES ('31', '东方大饭店', '考虑过他的', '辅导费', '2018-01-19 11:01:59');
INSERT INTO `sy_notice` VALUES ('32', '辅导费', '给他打个挂号费', '所得到的', '2018-01-19 11:02:13');

-- ----------------------------
-- Table structure for sy_role
-- ----------------------------
DROP TABLE IF EXISTS `sy_role`;
CREATE TABLE `sy_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(100) NOT NULL DEFAULT '' COMMENT '角色名称',
  `role_remark` varchar(255) DEFAULT '' COMMENT '角色备注',
  `status` tinyint(4) NOT NULL DEFAULT '2' COMMENT '状态(0、删除 1、禁用 2、正常)',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `auth_rule` varchar(255) DEFAULT NULL COMMENT '权限，id逗号隔开',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_role
-- ----------------------------
INSERT INTO `sy_role` VALUES ('1', '管理员', '管理员，拥有大部分权限。', '2', null, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36');
INSERT INTO `sy_role` VALUES ('2', '编辑', '网站编辑，拥有内容编辑权限。', '2', '2018-01-26 10:11:43', '16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35');
INSERT INTO `sy_role` VALUES ('6', 'guest', '访客，在后台只允许查看，不允许删除，新增等操作', '1', '2018-01-27 14:10:42', '1,2,3,4,5');

-- ----------------------------
-- Table structure for sy_slideshow
-- ----------------------------
DROP TABLE IF EXISTS `sy_slideshow`;
CREATE TABLE `sy_slideshow` (
  `slide_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `slide_title` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '轮播图标题',
  `slide_img` varchar(200) CHARACTER SET utf8 NOT NULL COMMENT '图片路径',
  `slide_thumb` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '缩略图',
  `slide_text` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '轮播图文字描述',
  `slide_jumpurl` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '图片名字',
  `slide_createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `is_slide` varchar(4) CHARACTER SET utf8 DEFAULT NULL COMMENT '是否设置为轮播图，0不是，1是',
  PRIMARY KEY (`slide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sy_slideshow
-- ----------------------------
INSERT INTO `sy_slideshow` VALUES ('9', 'ceshi测试32', '/static/upload/slideshow/20171226/upload_5b56895c7b6aa9c32bb8368233ce8623.jpg', '/static/upload/slideshow/20171226/upload_5b56895c7b6aa9c32bb8368233ce8623_thumb.jpg', '事实上', 'http://www.baidu.com', '2018-01-19 14:23:58', '0');
INSERT INTO `sy_slideshow` VALUES ('10', '201测试', '/static/upload/slideshow/20171226/upload_ca9e9baa0122166815375bda4ba434e6.jpg', '/static/upload/slideshow/20171226/upload_ca9e9baa0122166815375bda4ba434e6_thumb.jpg', '201测试', 'http://baidu.com', '2018-01-24 16:56:32', '0');
INSERT INTO `sy_slideshow` VALUES ('11', '这是测试图片', '/static/upload/slideshow/20180115/upload_7fb43f4d94c080ace4ae9efb55e9b4b8.jpg', '/static/upload/slideshow/20180115/upload_7fb43f4d94c080ace4ae9efb55e9b4b8_thumb.jpg', '测试图片', '#', '2018-01-15 15:52:52', '0');
INSERT INTO `sy_slideshow` VALUES ('12', '2018一定赚到钱', '/static/upload/slideshow/20180115/upload_de2461fe670bd4d315a6404fe01b1087.jpg', '/static/upload/slideshow/20180115/upload_de2461fe670bd4d315a6404fe01b1087_thumb.jpg', '红红红火火飞起来', '#', '2018-01-15 15:53:07', '0');
INSERT INTO `sy_slideshow` VALUES ('13', '你存在我深深的脑海里', '/static/upload/slideshow/20180115/upload_ec52a96c4401ac807ae68cad41e64b07.jpg', '/static/upload/slideshow/20180115/upload_ec52a96c4401ac807ae68cad41e64b07_thumb.jpg', '无知哦', '#', '2018-01-15 15:53:30', '0');
INSERT INTO `sy_slideshow` VALUES ('14', '爱在记忆中', '/static/upload/slideshow/20180115/upload_d39f5ce0991b5a13221af7daa6f6edda.jpg', '/static/upload/slideshow/20180115/upload_d39f5ce0991b5a13221af7daa6f6edda_thumb.jpg', '试试', '#', '2018-01-15 15:53:56', '0');
INSERT INTO `sy_slideshow` VALUES ('27', '测试一下', 'slide_20180124_upload_17fb9920248d2bc7004be52e9ac0ed55.jpg', null, '测试一下下', '#', '2018-01-24 16:08:58', '1');
