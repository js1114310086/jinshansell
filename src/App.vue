<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  #app {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: "微软雅黑 Light";
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button,
  input {
    outline: none;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  a:hover {
    color: #000;
    text-decoration: none;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
  }

  .flex-col {
    flex-direction: column;
  }

  .flex.h-center {
    align-items: center;
  }

  .flex.center {
    justify-content: center;
  }

  .flex.around {
    justify-content: space-around;
  }

  .flex.between {
    justify-content: space-between;
  }

  .flex-1 {
    flex: 1;
  }

  .flex .end {
    align-items: flex-end;
  }

  .clearFix {
    zoom: 1;
  }

  .clearFix:after {
    display: block;
    content: "";
    height: 0;
    clear: both;
    visibility: hidden;
    overflow: hidden;
  }

  .font-14 {
    font-size: 14px;
  }

  .font-15 {
    font-size: 15px;
  }

  .font-18 {
    font-size: 18px;
  }

  .font-20 {
    font-size: 20px;
  }

  .font-22 {
    font-size: 22px;
  }

  .font-24 {
    font-size: 24px;
  }

  [class*="font-"].red {
    color: #d23029;
  }

  [class*="font-"].gray {
    color: #5a5a5a;
  }

  [class*="font-"].green {
    color: #5bc0bf;
  }

  [class*="font-"].bold {
    font-weight: bold;
  }

  .body {
    padding: 80px 30px 30px;
  }

  .text-center {
    text-align: center;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #5bc0bf !important;
  }

  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .el-pager li {
    background-color: #fff !important;
  }

  .el-table__empty-block {
    border-left: 1px solid #b4b4b4;
    border-top: 1px solid #b4b4b4;
  }

  .el-table__empty-block {
    line-height: 60px;
  }

  .el-upload {
    text-align: left !important;
  }

  .el-tag .el-icon-close {
    color: #fff !important;
  }
</style>