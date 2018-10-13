/*
Navicat MySQL Data Transfer

Source Server         : lyy
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : yiguo

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-10-13 18:08:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `uname` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `pname` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `qty` varchar(255) DEFAULT NULL,
  `id` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('13911111111', 'http://localhost:1111/images/liebiaoye/lb-li3.jpg', '新疆库尔勒香梨1kg约100g/个', '19.90', '1', '3');
INSERT INTO `cart` VALUES ('13911111111', 'http://localhost:1111/images/liebiaoye/lb-li4.jpg', '新疆库尔勒精选香梨2kg约120g/个', '41.80', '1', '4');
INSERT INTO `cart` VALUES ('13911111111', 'http://localhost:1111/images/liebiaoye/lb-li2.jpg', '山东丰水梨6个约300g/个', '18.80', '9', '2');
INSERT INTO `cart` VALUES ('13711111111', 'http://localhost:1111/images/liebiaoye/lb-li1.jpg', '新疆库尔勒精选香梨1kg约120g/个', '22.80', '10', '1');
INSERT INTO `cart` VALUES ('13711111111', 'http://localhost:1111/images/liebiaoye/lb-li4.jpg', '新疆库尔勒精选香梨2kg约120g/个', '41.80', '1', '4');
INSERT INTO `cart` VALUES ('13711111111', 'http://localhost:1111/images/liebiaoye/lb-li2.jpg', '山东丰水梨6个约300g/个', '18.80', '1', '2');
INSERT INTO `cart` VALUES ('15770724903', 'http://localhost:1111/images/liebiaoye/lb-li4.jpg', '新疆库尔勒精选香梨2kg约120g/个', '41.80', '5', '4');

-- ----------------------------
-- Table structure for denglu
-- ----------------------------
DROP TABLE IF EXISTS `denglu`;
CREATE TABLE `denglu` (
  `uname` varchar(255) NOT NULL,
  `pwd` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`uname`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of denglu
-- ----------------------------
INSERT INTO `denglu` VALUES ('15770724903', '111111');
INSERT INTO `denglu` VALUES ('15770774447', '222222');
INSERT INTO `denglu` VALUES ('13870083926', '111111');
INSERT INTO `denglu` VALUES ('13670734765', '111111');
INSERT INTO `denglu` VALUES ('13933434452', 'aaaaaa');
INSERT INTO `denglu` VALUES ('15700000000', '111111');
INSERT INTO `denglu` VALUES ('13711111111', '111111');
INSERT INTO `denglu` VALUES ('13911111111', '111111');

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` int(11) NOT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `pname` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('1', '../images/liebiaoye/lb-li1.jpg', '新疆库尔勒精选香梨1kg约120g/个', '22.80', '核小多汁 爽口化渣');
INSERT INTO `goodslist` VALUES ('2', '../images/liebiaoye/lb-li2.jpg', '山东丰水梨6个约300g/个', '18.80', '块头更大 汁水更足');
INSERT INTO `goodslist` VALUES ('3', '../images/liebiaoye/lb-li3.jpg', '新疆库尔勒香梨1kg约100g/个', '19.90', '细皮嫩肉的小甜心');
INSERT INTO `goodslist` VALUES ('4', '../images/liebiaoye/lb-li4.jpg', '新疆库尔勒精选香梨2kg约120g/个', '41.80', '核小多汁 爽口化渣');
INSERT INTO `goodslist` VALUES ('5', '../images/liebiaoye/lb-li5.jpg', '新疆库尔勒香梨3kg礼盒装约100g/', '79.00', '礼盒包装  细皮嫩肉小甜心');
INSERT INTO `goodslist` VALUES ('6', '../images/liebiaoye/lb-li6.jpg', '新疆库尔勒香梨3kg约100g/个', '58.00', '细皮嫩肉的小甜心');
INSERT INTO `goodslist` VALUES ('7', '../images/liebiaoye/lb-li7.jpg', '山东丰水梨4个约300g/个', '5.80', '甜甜润润水灵灵');
SET FOREIGN_KEY_CHECKS=1;
