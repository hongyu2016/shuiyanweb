/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : shuiyan

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-16 16:30:55
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
  `login_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '登陆时间',
  `login_ip` bigint(20) NOT NULL DEFAULT '0' COMMENT '登陆IP',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `role_id` int(10) NOT NULL COMMENT '角色ID关联role',
  `stutas` tinyint(4) NOT NULL DEFAULT '2' COMMENT '状态（0、删除 1、禁用 2、正常）',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `shop_admin_adminuser_adminpass` (`admin_name`,`admin_pass`),
  UNIQUE KEY `shop_admin_adminuser_adminemail` (`admin_name`,`admin_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_admin
-- ----------------------------
INSERT INTO `sy_admin` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '971976839@qq.com', '0', '0', '1510279012', '0', '2');

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
  `parent_menu` int(11) NOT NULL COMMENT '一级菜单的parentmenu为-1，其他值则表示子菜单此时parentmenu的值就是菜单表的主键',
  `icon_class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_menu
-- ----------------------------
INSERT INTO `sy_menu` VALUES ('1', '添加管理员', '', null, '7', 'fa fa-file');
INSERT INTO `sy_menu` VALUES ('2', '管理管理员', '', null, '7', 'fa fa-fire');
INSERT INTO `sy_menu` VALUES ('3', '添加角色', '', null, '8', 'fa fa-flag');
INSERT INTO `sy_menu` VALUES ('4', '管理角色', '', null, '8', 'fa fa-gavel');
INSERT INTO `sy_menu` VALUES ('5', '添加一级菜单', '', null, '9', 'fa fa-group');
INSERT INTO `sy_menu` VALUES ('6', '一级菜单管理', '', null, '9', 'fa fa-feed');
INSERT INTO `sy_menu` VALUES ('7', '管理员管理', '', null, '-1', 'fa fa-gift');
INSERT INTO `sy_menu` VALUES ('8', '角色管理', '', null, '-1', 'fa fa-glass');
INSERT INTO `sy_menu` VALUES ('9', '菜单管理', '', null, '-1', 'fa fa-sort');
INSERT INTO `sy_menu` VALUES ('10', '通知公告', '/notice/index?menu_id=10', null, '22', 'fa fa-map');
INSERT INTO `sy_menu` VALUES ('15', '水研新闻', '/news/index?menu_id=15', null, '22', 'fa fa-taxi');
INSERT INTO `sy_menu` VALUES ('16', '系统设置', '', null, '-1', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('19', '新闻分类', '/news_sort/index?menu_id=19', null, '22', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('20', '图库管理', '/slideshow/index?menu_id=20', null, '22', 'fa fa-photo');
INSERT INTO `sy_menu` VALUES ('21', '水研介绍', '/introduce/add?menu_id=21', null, '22', 'fa fa-photo');
INSERT INTO `sy_menu` VALUES ('22', '内容管理', '', null, '-1', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('23', '联系我们', '/contact/index?menu_id=23', null, '22', 'fa fa-taxi');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_news
-- ----------------------------
INSERT INTO `sy_news` VALUES ('1', '1', '论水研张林的才华', '论水研张林的才华22014', '00000', '<p><img src=\"https://shuiyanweb.herokuapp.com/static/upload/20180112/upload_a482b02935168781781c2cf94923073f.jpg\" alt=\"psb (1).jpg\"/></p><p><img src=\"/static/upload/20171220/upload_65b235110a4cd4628105239059f13ce7.jpg\" title=\"upload_65b235110a4cd4628105239059f13ce7.jpg\" alt=\"出场缴费1.jpg\"/></p><p>从前有座山。。。。。</p><p><br/></p>', '张林', '原创', null, null, '2017-11-21 17:17:35', '2018-01-12 15:10:48', 'https://shuiyanweb.herokuapp.com/static/upload/20180112/upload_a482b02935168781781c2cf94923073f.jpg');
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
INSERT INTO `sy_news_sort` VALUES ('1', '通知公告', 'admin', '2017-11-20 11:34:50');
INSERT INTO `sy_news_sort` VALUES ('2', '今日新闻', 'admin', '2017-11-20 11:34:33');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_notice
-- ----------------------------
INSERT INTO `sy_notice` VALUES ('2', '公告上2', '20158年还仅仅是事实上', '宇哥', '2018-01-15 17:33:50');

-- ----------------------------
-- Table structure for sy_role
-- ----------------------------
DROP TABLE IF EXISTS `sy_role`;
CREATE TABLE `sy_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(100) NOT NULL DEFAULT '' COMMENT '角色名称',
  `role_remark` varchar(255) DEFAULT '' COMMENT '角色备注',
  `status` tinyint(4) NOT NULL DEFAULT '2' COMMENT '状态(0、删除 1、禁用 2、正常)',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_role
-- ----------------------------
INSERT INTO `sy_role` VALUES ('1', '超级管理员', '超级管理员，拥有最高权限', '2');

-- ----------------------------
-- Table structure for sy_role_auth
-- ----------------------------
DROP TABLE IF EXISTS `sy_role_auth`;
CREATE TABLE `sy_role_auth` (
  `auth_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `menu_id` int(11) NOT NULL COMMENT '菜单ID',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态（0：未授权  1：已授权）',
  PRIMARY KEY (`auth_id`),
  KEY `SY_ROLE_AUTH_MENU` (`menu_id`),
  KEY `SY_ROLE_AUTH_ROLE` (`role_id`),
  CONSTRAINT `SY_ROLE_AUTH_MENU` FOREIGN KEY (`menu_id`) REFERENCES `sy_menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `SY_ROLE_AUTH_ROLE` FOREIGN KEY (`role_id`) REFERENCES `sy_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_role_auth
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sy_slideshow
-- ----------------------------
INSERT INTO `sy_slideshow` VALUES ('9', 'ceshi测试32', '/static/upload/slideshow/20171226/upload_5b56895c7b6aa9c32bb8368233ce8623.jpg', '/static/upload/slideshow/20171226/upload_5b56895c7b6aa9c32bb8368233ce8623_thumb.jpg', '事实上', '#', '2018-01-15 11:51:41', '0');
INSERT INTO `sy_slideshow` VALUES ('10', '201测试', '/static/upload/slideshow/20171226/upload_ca9e9baa0122166815375bda4ba434e6.jpg', '/static/upload/slideshow/20171226/upload_ca9e9baa0122166815375bda4ba434e6_thumb.jpg', '201测试', 'http://baidu.com', '2017-12-26 15:50:39', '1');
INSERT INTO `sy_slideshow` VALUES ('11', '这是测试图片', '/static/upload/slideshow/20180115/upload_7fb43f4d94c080ace4ae9efb55e9b4b8.jpg', '/static/upload/slideshow/20180115/upload_7fb43f4d94c080ace4ae9efb55e9b4b8_thumb.jpg', '测试图片', '#', '2018-01-15 15:52:52', '0');
INSERT INTO `sy_slideshow` VALUES ('12', '2018一定赚到钱', '/static/upload/slideshow/20180115/upload_de2461fe670bd4d315a6404fe01b1087.jpg', '/static/upload/slideshow/20180115/upload_de2461fe670bd4d315a6404fe01b1087_thumb.jpg', '红红红火火飞起来', '#', '2018-01-15 15:53:07', '0');
INSERT INTO `sy_slideshow` VALUES ('13', '你存在我深深的脑海里', '/static/upload/slideshow/20180115/upload_ec52a96c4401ac807ae68cad41e64b07.jpg', '/static/upload/slideshow/20180115/upload_ec52a96c4401ac807ae68cad41e64b07_thumb.jpg', '无知哦', '#', '2018-01-15 15:53:30', '0');
INSERT INTO `sy_slideshow` VALUES ('14', '爱在记忆中', '/static/upload/slideshow/20180115/upload_d39f5ce0991b5a13221af7daa6f6edda.jpg', '/static/upload/slideshow/20180115/upload_d39f5ce0991b5a13221af7daa6f6edda_thumb.jpg', '试试', '#', '2018-01-15 15:53:56', '0');
