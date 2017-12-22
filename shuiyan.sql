/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : shuiyan

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-12-22 12:53:57
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

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
INSERT INTO `sy_menu` VALUES ('10', '通知公告', '', null, '-1', 'fa fa-map');
INSERT INTO `sy_menu` VALUES ('11', '水研新闻', '', null, '-1', 'fa fa-photo');
INSERT INTO `sy_menu` VALUES ('12', '添加公告', '', null, '10', 'fa fa-pencil');
INSERT INTO `sy_menu` VALUES ('13', '公告列表', '', null, '10', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('14', '发布新闻', '/news/add?menu_id=14', null, '11', 'fa fa-tags');
INSERT INTO `sy_menu` VALUES ('15', '新闻列表', '/news/index?menu_id=15', null, '11', 'fa fa-taxi');
INSERT INTO `sy_menu` VALUES ('16', '系统设置', '', null, '-1', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('17', '新闻分类', '', null, '-1', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('18', '添加分类', '/news_sort/add?menu_id=18', null, '17', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('19', '分类列表', '/news_sort/index?menu_id=19', null, '17', 'fa fa-star');
INSERT INTO `sy_menu` VALUES ('20', '轮播图管理', '/slideshow/index?menu_id=20', null, '-1', 'fa fa-photo');

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_news
-- ----------------------------
INSERT INTO `sy_news` VALUES ('1', '1', '论水研张林的才华', '论水研张林的才华22014', '00000', '<p><img src=\"/static/upload/20171220/upload_65b235110a4cd4628105239059f13ce7.jpg\" title=\"upload_65b235110a4cd4628105239059f13ce7.jpg\" alt=\"出场缴费1.jpg\"/></p><p>从前有座山。。。。。</p><p><br/></p>', '张林', '原创', null, null, '2017-11-21 17:17:35', '2017-12-20 16:45:29', null);
INSERT INTO `sy_news` VALUES ('2', '2', '论水研张林的才华', '', '', '<p>从前有座山。。。。。</p>', '', '', null, null, '2017-11-21 17:23:07', null, null);
INSERT INTO `sy_news` VALUES ('3', '1', '通告1', '', '', '<p>通告1</p>', '', '', null, null, '2017-11-21 17:50:06', null, null);
INSERT INTO `sy_news` VALUES ('4', '1', '通告2', '', '', '<p>通告2</p>', '', '', null, null, '2017-11-21 17:50:14', null, null);
INSERT INTO `sy_news` VALUES ('5', '1', '通告3', '', '', '<p>通告3</p>', '', '', null, null, '2017-11-21 17:50:20', null, null);
INSERT INTO `sy_news` VALUES ('6', '1', '通告4', '', '', '<p>通告4</p>', '', '', null, null, '2017-11-21 17:50:26', null, null);
INSERT INTO `sy_news` VALUES ('7', '1', '通告5', '', '', '<p>通告5</p>', '', '', null, null, '2017-11-21 17:50:32', null, null);
INSERT INTO `sy_news` VALUES ('8', '1', '通告6', '', '', '<p>通告6</p>', '', '', null, null, '2017-11-21 17:50:40', null, null);
INSERT INTO `sy_news` VALUES ('9', '2', '新闻1', '', '', '<p>新闻1</p>', '', '', null, null, '2017-11-21 17:50:49', null, null);
INSERT INTO `sy_news` VALUES ('11', '2', '新闻3', '', '', '<p>新闻3</p>', '', '', null, null, '2017-11-21 17:51:03', null, null);

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
  PRIMARY KEY (`slide_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sy_slideshow
-- ----------------------------
INSERT INTO `sy_slideshow` VALUES ('9', 'ceshi测试32', '/static/upload/slideshow/20171222/upload_fc922504a541430a5b0a67db43abc0e2.jpg', '/static/upload/slideshow/20171222/upload_fc922504a541430a5b0a67db43abc0e2_thumb.jpg', '事实上', '#', '2017-12-22 11:08:14');
