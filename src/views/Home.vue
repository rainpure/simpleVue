<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                {{collapsed?'':sysName}}
            </el-col>
            <el-col :span="1">
                <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="4">
                <strong class="title">{{$route.name}}</strong>
            </el-col>
            <el-col :span="1" class="setting">
                <el-dropdown>
                    <i class="el-icon-setting" trigger="hover"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出账号</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="1" class="userinfo">
                <span class="el-dropdown-link userinfo-inner">
                    <img :src="this.sysUserAvatar" />{{sysUserName}}</span>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside>
                <el-menu default-active="$route.path" class="el-menu-vertical-demo" router :collapse="collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title">
                                <i :class="item.iconClass"></i><span slot="title">{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                            <i :class="item.iconClass"></i>{{item.children[0].name}}
                        </el-menu-item>
                    </template>
                </el-menu>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                sysName: '贝雷工作室',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: ''
            }
        },
        methods: {
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    // sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            // 修改密码
            changePassword() {
                this.$router.push('/password');
            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            }
        },
        mounted() {
            // 从sessionStorage获取当前登录的用户信息
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }

        }
    }
</script>

<style scoped lang="scss">
    @import '~@/styles/vars.scss';
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #fff;
            color: $color-primary;
            border: 1px solid #eef1f6;
            .setting {
                float: right;
                cursor: pointer;
            }
            .el-icon-setting {
                font-size: x-large;
                vertical-align: middle;
            }
            .userinfo {
                float: right;
                .userinfo-inner {
                    color: #666;
                    img {
                        width: 40px;
                        height: 40px;
                        margin: 10px 0px 10px 10px;
                    }
                }
            }
            .logo {
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                background: #eef1f6;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #48576a;
                }
            }
            .logo-width {
                width: 199px;
            }
            .logo-collapse-width {
                width: 63px
            }
            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }
        }
        .main {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                .el-menu {
                    height: 100%;
                }
                .el-submenu {
                    min-width: 200px;
                }
                .collapsed {
                    .item {
                        position: relative;
                    }
                }
            }
            .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 20px;
                .breadcrumb-container {
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>